from pyspark.sql import SparkSession
from pyspark.sql.types import IntegerType
import subprocess
import os
import json
from PIL import ImageFile
import json
import requests
from datetime import datetime
from pyspark.sql.functions import udf
import cv2
import numpy as np
from PIL import Image
import sys

ImageFile.LOAD_TRUNCATED_IMAGES = True

image_dir = sys.argv[1]
sub_path = sys.argv[2]
car_path = sys.argv[3]
output_path = sys.argv[4]

def get_response():
    time1 = datetime.now()
    formatted_time = time1.strftime("%Y-%m-%dT%H:%M:%S")
    print(formatted_time)    

    url = 'https://api.data.gov.sg/v1/transport/traffic-images'
    headers = {
        'Accept': 'application/json'
    }

    params = {
        # 'date_time': input("date_time YYYY-MM-DD[T]HH:mm:ss (SGT):")  
        'date_time' : formatted_time
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
    else:
        print('请求失败:', response.status_code)
    return data

data = get_response()

result = {}

for i in range (0,len(data["items"][0]["cameras"])):
        image_url = data["items"][0]["cameras"][i]["image"]
        latitude = data["items"][0]["cameras"][i]["location"]["latitude"]
        longitude = data["items"][0]["cameras"][i]["location"]["longitude"]
        camera_id = data["items"][0]["cameras"][i]["camera_id"]
        response = requests.get(image_url)
        if response.status_code == 200:
            img_name = image_dir+"/"+str(camera_id)+".jpg"
            with open(img_name, "wb") as f:
                f.write(response.content)
            result[camera_id]={"latitude":latitude,"longitude":longitude,"car_num":0,"image_name":img_name}
        else:
            print("图片下载失败:", response.status_code)

print("图片下载成功")

# 创建SparkSession
spark = SparkSession.builder \
    .appName("ParallelImageProcessing") \
    .getOrCreate()

# 读取图像列表

image_paths = [image_dir + "/" +img_name for img_name in os.listdir(image_dir)]

# 将图像路径列表转换为Spark DataFrame
image_df = spark.createDataFrame(image_paths, "string").toDF("path")
def Car_Detection(path):
    result = subprocess.run(["python", sub_path, path , car_path],capture_output=True, text=True)
    return 2*int(result.returncode)


# 使用UDF并行处理图像
udf_image = udf(Car_Detection, IntegerType())

df_desc = image_df.withColumn("num", udf_image("path"))

df_desc.show()
res = df_desc.collect()
for path,num in res:
    result[path[6:10]]["car_num"] = num

with open(output_path+"/result.json", "w") as file:
        json.dump(result, file,indent=4)


# 将 DataFrame 保存为 CSV 文件
df_desc.write.csv(output_path,mode="overwrite")
# 停止 SparkSession
spark.stop()
