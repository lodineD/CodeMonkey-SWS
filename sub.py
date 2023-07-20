import cv2
import numpy as np
from PIL import Image
import sys
from PIL import ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

def Car_Detection(path):
    image = Image.open(path)
    image = image.resize((450,250))
    image_arr = np.array(image)
    grey = cv2.cvtColor(image_arr,cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(grey,(5,5),0)
    dilated = cv2.dilate(blur,np.ones((3,3)))
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
    closing = cv2.morphologyEx(dilated, cv2.MORPH_CLOSE, kernel) 
    car_cascade = cv2.CascadeClassifier('cars.xml')
    cars = car_cascade.detectMultiScale(closing, 1.1, 1)
    return len(cars)

def main():
    result = Car_Detection(sys.argv[1])
    return result

if __name__ == "__main__":
    sys.exit(main())
