#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";

const args = minimist(process.argv.slice(2));

if(args.h){
	console.log(

		`
		Usage:galosh.js [options] - [n|s] LATITUDE  -[e|w] lONGITUDE -z TIME_ZONE
		-h 	Show this help message and exit.
		-n, -s  Latitude: N positive; S negative.
		-e, -w  Longitude: E positive; W negative.
		-z	Time zone: uses tz.guess() from moment-timezone by default.
		-d 0-6  Day to retrieve weather: 0 is today; defaults to 1. 
		-j	Echo pretty JSON from open -meteo API and exit.
		`
	);
	process.exit(0);
}

let latitude,longtitude;
if (args.n){
	latitude = args.n;
}else if (args.s) {
	latitude = -args.s;
}
if (args.e){
	longitude = args.e;
}else if (args.w) {
	longitude = -args.w;
}

if (latitude === undefined || Math.abs(latitude)>90){
	console.log("Latitude must be in range");
	process.exit(0);
}
if (longtitude === undefined || Math.abs(longitude)>180){
	console.log("Longtitude must be in range");
	process,exit(0);
}

let timezone = moment.tz.guess();
if(args.t){
	timezone = args.t;
}

const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&daily=precipitation_hours&current_weather=true&timezone=" + timezone;
const reponse = await fetch(url);

const data = await response.json();

if (args.j){
	console.log(data);
	process.exit(0);
}

const days = args.d;

if (days == 0) {
	console.log("today.")
}else if (days > 1){
	console.log("in " + days + " days.")
}else{
	console.log("tomorrow.")
}

