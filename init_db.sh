#!/bin/bash
/usr/bin/mysqld_safe --skip-grant-tables &
sleep 5
mysql -u root -e "CREATE DATABASE youtube"
mysql -u root youtube < /Users/briceida/dumps/Dump20180101.sql
