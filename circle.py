from car_detection import cal
import datetime
import time
import json
import mysql.connector

def insert_or_update_sql(connection):
    cur = connection.cursor()
    with open('result.json', 'r') as f:
        data = json.load(f)

    for item in data["body"]:
        camera_id = item["pic_id"]
        latitude = item["latitude"]
        longitude = item["longitude"]
        car_num = item["car_num"]
        image_name = item["image_name"]
        sql = "insert into cars (pic_id,latitude,longitude,car_num,image_name) value (%s,%s,%s,%s,%s) on duplicate key update latitude = %s, longitude = %s, car_num = %s, image_name = %s"
        db_data = (camera_id,latitude, longitude, car_num, image_name, latitude, longitude, car_num, image_name)

        try:
            # Execute the SQL command
            cur.execute(sql,db_data)
            # Commit your changes in the database
            connection.commit()
        except:
            # Rollback in case there is any error
            connection.rollback()

if __name__ == "__main__":
    connection = mysql.connector.connect(
        host = 'car.cocfi12ed6lp.us-east-1.rds.amazonaws.com',
        port = 3306,
        user = 'admin',
        password = 'ycx030830',
        database = 'CAR'
    )

    while True:
        cal()
        insert_or_update_sql(connection)
        now = datetime.datetime.now()
        if now.minute % 5 == 0:
            cal()
            insert_or_update_sqls(connection)
        print("Will cal 5 minutes later")
        time.sleep(60)