from pyspark.sql import SparkSession
from PIL import Image
import os
import json
from PIL import ImageFile
import cv2
import numpy as np
import json
import requests
from datetime import datetime
ImageFile.LOAD_TRUNCATED_IMAGES = True
os.environ["OBJC_DISABLE_INITIALIZE_FORK_SAFETY"] = "YES"

# 创建SparkSession
spark = SparkSession.builder \
    .appName("ParallelImageProcessing") \
    .getOrCreate()

# 读取图像列表
image_paths = ["./img/" + img_name for img_name in os.listdir("./img")]

# 将图像路径列表转换为Spark DataFrame
image_df = spark.createDataFrame(image_paths, "string").toDF("path")

def Car_Detection(path):
    from PIL import Image
    import os
    import json
    from PIL import ImageFile
    import cv2
    import numpy as np
    import json
    from datetime import datetime
    ImageFile.LOAD_TRUNCATED_IMAGES = True
    image = Image.open(path)
    image = image.resize((450,250))
    image_arr = np.array(image)
    grey = cv2.cvtColor(image_arr,cv2.COLOR_BGR2GRAY)
    Image.fromarray(grey)
    blur = cv2.GaussianBlur(grey,(5,5),0)
    Image.fromarray(blur)
    dilated = cv2.dilate(blur,np.ones((3,3)))
    Image.fromarray(dilated)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
    closing = cv2.morphologyEx(dilated, cv2.MORPH_CLOSE, kernel) 
    Image.fromarray(closing)
    car_cascade = cv2.CascadeClassifier('cars.xml')
    cars = car_cascade.detectMultiScale(closing, 1.1, 1)
    return len(cars)


# 使用UDF并行处理图像
spark.udf.register("process_image", Car_Detection)

processed_df = image_df.selectExpr("path", "process_image(path) as processed_result")

# 将处理结果转换为JSON格式
json_rdd = processed_df.rdd.map(lambda x: json.dumps({"path": x.path, "result": x.processed_result}))

# 将JSON存储为单个文件
output_file = "./output"
json_rdd.coalesce(1).saveAsTextFile(output_file)

# 关闭SparkSession
spark.stop()
