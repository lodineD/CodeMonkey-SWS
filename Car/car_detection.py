from PIL import Image
import cv2
import numpy as np
import requests
import json
import requests
from datetime import datetime

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
    result = {"body" : []}
    return data,result

def Car_Detection(path):
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

def cal():
    data , result = get_response()

    for i in range (0,len(data["items"][0]["cameras"])):
        image_url = data["items"][0]["cameras"][i]["image"]
        latitude = data["items"][0]["cameras"][i]["location"]["latitude"]
        longitude = data["items"][0]["cameras"][i]["location"]["longitude"]
        camera_id = data["items"][0]["cameras"][i]["camera_id"]
        response = requests.get(image_url)
        if response.status_code == 200:
            img_name = "./img/img"+str(i+1)+".jpg"
            with open(img_name, "wb") as f:
                f.write(response.content)
        else:
            print("图片下载失败:", response.status_code)
        print(img_name)
        car_num = Car_Detection(img_name)
        print("car : " + str(car_num))
        result["body"].append({"pic_id":camera_id,"latitude":latitude,"longitude":longitude,"car_num":car_num,"image_name":img_name})
    
    with open("result.json", "w") as file:
        json.dump(result, file,indent=4)