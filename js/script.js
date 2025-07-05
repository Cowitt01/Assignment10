/*
Cory Witt
script.js
INFO 1579
Shaw
07/24/2025
*/
 
"use strict";

$(document).ready(() => {
  const baseUrl = 'https://www.mccinfo.net/epsample/employees';
  const employeeList = document.getElementById('employeeList');
  const employeeInfo = document.getElementById('employeeInfo');

  $('#errorHolder').hide();
  $('#loadingHolder').hide();
  $('#employeeList').hide();

   $('#getEmployees').click((evt) => {
   $(evt.target).parent().slideUp();
   $('#loadingHolder').slideDown();

    fetch(baseUrl)
    .then(response => response.json())
    .then((employees) => {
        for (let employee of employees) {
            let div = document.createElement('div');
            let a = document.createElement('a');
            a.href = '#';
            a.id = employee.id;
            a.innerHTML = `${employee.first_name} ${employee.last_name}`;
            a.addEventListener('click', onEmployeeClicked);
            div.appendChild(a);
            employeeList.appendChild(div);
        }
        $('#loadingHolder').fadeOut(400, () => {
            $('#employeeList').fadeIn();
        });
    });
});

const onEmployeeClicked = (e) => {
    $('#errorHolder').hide();
    $('#errorHolder').html('');
    employeeInfo.innerHTML = '';

    fetch (`${baseUrl}\/${e.currentTarget.id}`)
      .then(response => response.json())
      .then((employee) => {
        
        const div = document.createElement('div');
        const img = document.createElement('img');
       
        const h1 = document.createElement('h1');
        const divDepartment = document.createElement('div');
        const divSalary = document.createElement('div');
  
        const divHireDate = document.createElement('div');
       
 
        const fullDayName = hireDate.getFullDayName();
        const fullMonthName = hireDate.getFullMonthName();
        const year = hireDate.getFullYear().toString();
        const ordinal = hireDate.getDateOrdinal();
        const hireDateText = `${fullDayName}, ${fullMonthName}, ${ordinal}, ${year}`;
 
        img.src = employee.image_filename;
        img.alt = `${employee.first_name} ${employee.last_name}`;
        h1.innerText = `${employee.first_name} ${employee.last_name}`;
        divDepartment.innerText = `Department: ${employee.department.name}`;
        divSalary.innerText = `Annual Salary: ${accounting.formatMoney(employee.annual_salary)}`;
        divHireDate.innerText = `Hire Date: ${hireDateText}`;
 
        div.appendChild(img);
        div.appendChild(h1);
        div.appendChild(divDepartment);
        div.appendChild(divSalary);
        div.appendChild(divHireDate);

        employeeInfo.appendChild(div);
      })
      // if the api call fails the error message is displayed in the console
      .catch((e) => {
        console.log(e.message);
      });
  };
});
