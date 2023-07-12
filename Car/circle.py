from car_detection import cal
import datetime
import time

while True:
    cal()
    now = datetime.datetime.now()
    if now.minute % 5 == 0:
        cal()
    print("Will cal 5 minutes later")
    time.sleep(60)