/*
Cory Witt
script.js
INFO 1579
Shaw
07/31/2025
*/
 
"use strict";

// The Employee List program will retrieve employee data from an API (from MCC - https://www.mccinfo.net/epsample/employees)
// The user can click on an employee's name to view their details (department, annual salary, and hire date).
// The program uses the accounting.js script for formatting the annual salary.

$(document).ready(() => {
  const baseUrl = 'https://www.mccinfo.net/epsample/employees';               //baseURL for the API
  const employeeList = document.getElementById('employeeList');               //create reference to the employeeList element
  const employeeInfo = document.getElementById('employeeInfo');               //create reference to the employeeInfo element

  $('#errorHolder').hide();                                                   // hide the error holder,loading holder, and employee list
  $('#loadingHolder').hide();
  $('#employeeList').hide();

  $('#getEmployees').click((evt) => {                                         // when the getEmployees button is clicked, clear the employee list, show the loading holder, and fetch the employee data
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
                      a.addEventListener('click', onEmployeeClicked);         // add an event listener to the anchor tag to handle clicks on employee names
                      div.appendChild(a);
                      employeeList.appendChild(div);
              }
              $('#loadingHolder').fadeOut(400, () => {
                  $('#employeeList').fadeIn();
           });
     });
});

const onEmployeeClicked = (e) => {                                           // when an employee is clicked, clear the error holder, hide it, and fetch the employee details
    $('#errorHolder').hide();
    $('#errorHolder').html('');
    employeeInfo.innerHTML = '';

    fetch (`${baseUrl}\/${e.currentTarget.id}`)                              // fetch the employee details using the employee ID from the clicked element
    .then(response => response.json())
    .then((employee) => {
        let div = document.createElement('div');                             // create a div to hold the employee information
        
        let img = document.createElement('img');                             // create an image element for the employee's photo
            img.src = employee.image_filename;                               // set the source of the image to the employee's photo
            img.alt = `${employee.first_name} ${employee.last_name}`;        // set the alt text of the image to the employee's name

        let h1 = document.createElement('h1');                              // create an h1 element for the employee's name
            h1.innerText = `${employee.first_name} ${employee.last_name}`;

        let divDepartment = document.createElement('div');                  // create a div for the employee's department
            divDepartment.innerText = `Department: ${employee.department.name}`;

        let divSalary = document.createElement('div');                     // create a div for the employee's annual salary
 
        divSalary.innerText = `Annual Salary: ${accounting.formatMoney(employee.annual_salary)}`; // format the annual salary using the accounting.js library (using formatMoney function)
                                                                                                  //Default settings for accounting.js formatMoney():
                                                                                                  /*Currency Symbol: $
                                                                                                    Currency Format: %s%v (symbol before value, e.g., "$123.45")
                                                                                                    Decimal Separator: . (period)
                                                                                                    Thousands Separator: , (comma)
                                                                                                    Precision (Decimal Places): */
 
         let divHireDate = document.createElement('div');                                        // create a div for the hire date
            divHireDate.innerText = `Hire Date: ${employee.hire_date}`;                          // display the hire date

            div.appendChild(img);
            div.appendChild(h1);
            div.appendChild(divDepartment);                                                      // append the department div to the main div
            div.appendChild(divSalary);                                                          // append the salary div to the main div
            div.appendChild(divHireDate);                                                        // append the hire date div to the main div

            employeeInfo.appendChild(div);                                                       // append the employee info div to the main div
      })
     
      .catch((e) => {                                                              // if the api call fails the error message is displayed in the console
        console.log(e.message);
      });
  };
}); 