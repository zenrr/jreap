import { Observable, Subject, ReplaySubject, from, of , range, fromEvent } from 'rxjs';
import { map, filter, switchMap, scan, throttleTime } from 'rxjs/operators';
import $ from "jquery";
import "bootstrap";
import '@progress/kendo-ui';


import "./css/main.scss";

let button = document.querySelector('button');
fromEvent(button, 'click').pipe(
        throttleTime(1000),
        map(event => event.clientX),
        scan((count, clientX) => count + clientX, 0)
    )
    .subscribe(count => console.log(count));

$("#test").kendoGrid({
    columns: [
        { field: "name" },
        { field: "age" }
    ],
    dataSource: {
        data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
        ]
    }
});