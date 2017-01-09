/*javascript page*/
var myArray = new Array(); 
var num = 0; 

function addExpense()
{	
	//validate paycheckAmount input
	if(document.getElementById("paycheckAmount").value >= 0)
	{
	/*get the values from the text box*/
	var expenseName = document.getElementById("textBoxExpenseName").value;
	var expenseAmount = document.getElementById("textBoxExpenseAmount").value;
	var expenseNumber = Number(expenseAmount).toFixed(2);
	
	//calculate the monthly pay if it has not been calculated arlready 
	if(num < 1)
	{
	myArray[0] = calculatePay();
	
	//create text income label and amount 
	var lblMonthlyIncome = document.createElement("H2"); 
	var lblMonthlyIncomeAmount = document.createElement("H3");
	var textMonthlyIncome = document.createTextNode("Monthly Income"); 
	var textMonthlyIncomeAmount = document.createTextNode("$ " + myArray[0].toFixed(2)); 
	
	lblMonthlyIncome.appendChild(textMonthlyIncome); 
	lblMonthlyIncomeAmount.appendChild(textMonthlyIncomeAmount);
	
	document.getElementById("monthlyIncome").appendChild(lblMonthlyIncome); 
	document.getElementById("monthlyIncomeAmount").appendChild(lblMonthlyIncomeAmount);
	
	//increase iteration
	num++; 
	}
	
	var percentageOfIncome = calculatePercent(expenseNumber); 
	var saveAmount = calculateSaveAmount(expenseNumber); 
	
	//Add expense to the array 
	myArray.push(Number(expenseNumber));    	
	
	/*create html element and text nodes to put in html element*/
	var lblExpenseName = document.createElement("H2");
	var lblExpenseAmount = document.createElement("H3");
	var lblExpensePercent = document.createElement("SMALL"); 
	var textPercentage = document.createTextNode(percentageOfIncome + " " +saveAmount); 
	var textName = document.createTextNode(expenseName);
	var textAmount = document.createTextNode("$ " + expenseNumber);
	
	
	/*add the text to the html element*/
	lblExpensePercent.appendChild(textPercentage); 
	lblExpenseName.appendChild(textName);
	lblExpenseName.appendChild(lblExpensePercent);
	lblExpenseAmount.appendChild(textAmount); 
	document.getElementById("expenseList").appendChild(lblExpenseName);
	document.getElementById("expenseList").appendChild(lblExpenseAmount);

	/*clear the textBox values*/ 
	document.getElementById("textBoxExpenseName").value = ""; 
	document.getElementById("textBoxExpenseAmount").value = ""; 	
	
	/*call total/totalExpenses method to recalculate*/
	totalExpenses();
	total(); 
	}
	else
	{
		alert("Please enter a number greater than or equal to 0 for your paycheck amount.");
	}	
}//end addExpense() 

function deleteExpense()
{
	var myList = document.getElementById("expenseList");
	
	/*removes the last two child nodes*/ 
	myList.removeChild(myList.lastChild);
	myList.removeChild(myList.lastChild);
	
	myArray.pop(); 
	
	/*call total method to recalculate*/ 
	totalExpenses();
	total(); 
}

//totals all the expenses and ads element to html 
function totalExpenses()
{
	var totalAmount = 0; 
	var myTotal = document.getElementById("expTotalLabel"); 	
	var len = myArray.length;

	for(var i = 1; i < len; i++)
	{
		totalAmount = totalAmount + myArray[i]; 
	}
	
	/*removes the last instance of the total node*/ 
	if(myTotal.hasChildNodes())
	{	
	myTotal.removeChild(myTotal.lastChild);
	}

	/*create html element for the total*/ 
	var total = document.createElement("H2"); 
	var textTotal = document.createTextNode("Total Expenses: $-" + totalAmount.toFixed(2));	
	total.appendChild(textTotal); 
	document.getElementById("expTotalLabel").appendChild(total);	
}

//Income less total expenses
function total()
{
	var len = myArray.length;
	var totalExpenses = 0;
	var total = 0; 
	var lblNegative = document.getElementById("totalNegative");
	var lblPositive = document.getElementById("totalPositive"); 
	
	for(var i = 1; i < len; i++)
	{
		totalExpenses = totalExpenses + myArray[i]; 
	}	 
	total = myArray[0] - totalExpenses;   
	
	/*removes the last instance of the total node*/ 
	if(lblNegative.hasChildNodes())
	{	
	lblNegative.removeChild(lblNegative.lastChild);
	lblNegative.removeChild(lblNegative.lastChild);
	}
	
	if(lblPositive.hasChildNodes())
	{
		lblPositive.removeChild(lblPositive.lastChild); 
		lblPositive.removeChild(lblPositive.lastChild);
	}
	
	//adds total positive or negative to document 
	if(total >= 0)
	{
		var lblTotalName = document.createElement("H2"); 
	    var lblTotalAmount = document.createElement("H3");
		var textTotalName = document.createTextNode("Positive monthly cash flow."); 
		var textTotalAmount = document.createTextNode("Monthly Profit: $ " + total.toFixed(2)); 
		
		lblTotalName.appendChild(textTotalName); 
		lblTotalAmount.appendChild(textTotalAmount); 
		document.getElementById("totalPositive").appendChild(lblTotalName);
		document.getElementById("totalPositive").appendChild(lblTotalAmount); 
	}
	else
	{
		var lblTotalName = document.createElement("H2"); 
	    var lblTotalAmount = document.createElement("H3");
		var textTotalName = document.createTextNode("Your bleeeding money. STOP IT!!"); 
		var textTotalAmount = document.createTextNode("Monthly loss $ " + total.toFixed(2)); 
		
		lblTotalName.appendChild(textTotalName); 
		lblTotalAmount.appendChild(textTotalAmount); 
		document.getElementById("totalNegative").appendChild(lblTotalName);
		document.getElementById("totalNegative").appendChild(lblTotalAmount);
	}	
}

function calculatePay()
{
	
	var paycheckAmount = document.getElementById("paycheckAmount").value;
	var monthlyIncome = 0.00; 
	var temp; 
	
	if(document.getElementById("radioWeekly").checked)
	{
		temp = ((Number(paycheckAmount) * 52) / 12).toFixed(2);
		monthlyIncome = Number(temp); 
	}
	else if(document.getElementById("radioBi-Weekly").checked)
	{
		temp = ((Number(paycheckAmount) * 26) / 12 ).toFixed(2);
		monthlyIncome = Number(temp); 
	}
	else
	{
		monthlyIncome = Number(paycheckAmount); 
	}
	
	return monthlyIncome;
}

function calculatePercent(expenseNumber)
{ 
	
	if(myArray[0] > 0)
	{
	var percentIncome = (Number(expenseNumber) / myArray[0]) * 100;
	return " (" + percentIncome.toFixed(2) + "% of Your Monthly Income) "; 
	}
	else
	{
		return " (You have no monthly income) "; 
	}	
}

function calculateSaveAmount(expenseNumber)
{	
	var saveAmount = 0.00; 
	var temp; 
	var timePeriod;
	
	if(document.getElementById("radioWeekly").checked)
	{
		temp = ((Number(expenseNumber) * 12) / 52).toFixed(2);
		saveAmount = Number(temp).toFixed(2);
		timePeriod = "per week";
	}
	else if(document.getElementById("radioBi-Weekly").checked)
	{
		temp = ((Number(expenseNumber) * 12) / 26 ).toFixed(2);
		saveAmount = Number(temp).toFixed(2);
		timePeriod = "Bi-Weekly";		
	}
	else
	{
		saveAmount = Number(saveAmount); 
	}
	
	return " Cost: $" + saveAmount + " " + timePeriod;
}

