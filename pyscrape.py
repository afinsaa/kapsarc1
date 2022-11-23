

import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from bs4 import BeautifulSoup

import sqlite3
from csv import reader

import pandas as pd
from openpyxl import Workbook

import os

def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1024x1400")

    # download Chrome Webdriver  
    # https://sites.google.com/a/chromium.org/chromedriver/download
    # put driver executable file in the script directory
    chrome_driver = os.path.join(os.getcwd(), "chromedriver")

    driver = webdriver.Chrome(chrome_options=chrome_options, executable_path=chrome_driver)

    driver.get("http://www.jodidb.org/TableViewer/tableView.aspx?ReportId=93906")
    assert "Beyond".lower() in driver.title.lower()
    time.sleep(1)

    # scrap info
    h1_elem = driver.find_element("id", "OthDimItem2")
    print(h1_elem.text)

    # fill and submit form
    elem = driver.find_element("xpath", '//a[@href="'+"javascript:onClickSelectOther(2);"+'"]')
    elem.click()
    elem2 = driver.find_element("xpath", '//a[@href="'+"javascript:selectItem(2, 3);"+'"]')
    elem2.click()
    # elem.send_keys("python", Keys.ARROW_DOWN)
    # elem.send_keys(Keys.RETURN)
    # print(h1_elem.text)

    time.sleep(3)

    downloadElem = driver.find_element("xpath", '//a[@href="'+"javascript:OnDownloadButton();"+'"]')
    downloadElem.click()
    
    csvElem = driver.find_element("xpath", '//a[@href="'+"javascript:onDownload(2);"+'"]')
    csvElem.click()

    time.sleep(3)
    window_after = driver.window_handles[1]
    driver.switch_to.window(window_after)

    excelDLElem = driver.find_element("xpath", '//input[@value="'+"Download"+'"]')
    excelDLElem.click()


    excelFileName = excelDLElem.get_attribute('onclick')[29:-3]
    
    print(excelFileName)

    time.sleep(1)

    conn = sqlite3.connect('Exportsdb.db')

    

    print("Opened database successfully")

   
    conn.execute("Delete from CData")
    conn.commit()
   
    # open file 
    with open(''+excelFileName, 'r') as read_obj:
        # passing file object
        csv_reader = reader(read_obj)
        monthsR = []
        dataArr = []
        # Iterate over each row 
        for row in csv_reader:
            # row variable is a list that represents a row in csv
            # print(csv_reader.line_num)
            dataCounter = 0
            if(csv_reader.line_num == 5):
                monthsR = row
                # monthsR.pop(0)

            if(csv_reader.line_num > 6):
                for (k,v) in enumerate(row):
                    # print(v)
                    if(k > 0):
                        dataArr.append((row[0], monthsR[k], v))
        # conn.execute("INSERT INTO CData (COUNTRY,DMONTH,DVALUE) \
        #                 VALUES ( ?, ?, ?)", ( row[0], monthsR[k], v))  
                   
        dataCounter += dataCounter
        
    statm = "INSERT INTO CData (COUNTRY,DMONTH,DVALUE) VALUES (?, ?, ?)"
    conn.executemany(statm, dataArr)  

    # conn.execute("INSERT INTO DCT (DCOUNTRY,DMONTH,DVALUE) \
    #                     VALUES ( 'DDDD', 'SSS', 1212)") 

    conn.commit()

    

    db_df = pd.read_sql_query("SELECT * FROM CData", conn)
    db_df.to_csv('src/assets/formatted_data.csv', index=False)

    

    conn.close()

    driver.close()

if __name__ == '__main__' : main()