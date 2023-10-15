/* Copyright (c) 2023, LeadSwift. All rights reserved.
 *
 * This file is exclusively licensed to active LeadSwift clients and is protected by
 * copyright law. You are not authorized to copy, modify or distribute this CSS file
 * outside of LeadSwift without prior written permission.
 *
 * Learn more about LeadSwift at https://leadswift.com/
 */
 
let selects = document.querySelectorAll("select");
selects.forEach((select) => {
   NiceSelect.bind(select);
});

// custom tab
tabFunc(
   document.querySelectorAll(".user"),
   document.querySelectorAll(".testimony-slide")
);

function tabFunc(tabLinks, tabs) {
   tabLinks.forEach((link, index) => {
      link.addEventListener("click", () => {
         for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].classList.remove("active");
            tabs[i].classList.remove("active");
         }
         link.classList.add("active");
         tabs[index].classList.add("active");
      });
   });
}

window.addEventListener("load", () => {
   applyLergestheight(document.querySelectorAll(".testimony-body"));
});
window.addEventListener("resize", () => {
   applyLergestheight(document.querySelectorAll(".testimony-body"));
});
function applyLergestheight(items) {
   const itemheight = [];
   items.forEach((item) => {
      item.style.height = "auto";
      itemheight.push(item.getBoundingClientRect().height);
   });
   items.forEach((item) => {
      item.style.height = Math.max.apply(null, itemheight) + "px";
   });
}

//========== CLONE MANU TO SIDEBAR ==========>
const mainmenu = document.querySelectorAll(".mainmenu");
mainmenu.forEach((wrap) => {
   let linkUl = wrap.querySelector("ul");
   let sidebarMenu = document.querySelector(".sidebar-menu");
   sidebarMenu.appendChild(linkUl.cloneNode(true));
});

// sidebar menu clicking event
const resBar = document.querySelectorAll(
   ".humberger-bar, .sidebar-slide-overlay"
);
resBar.forEach((btn) => {
   btn.addEventListener("click", () => {
      sidebarMenuAction();
   });
});
function sidebarMenuAction() {
   for (let i = 0; i < resBar.length; i++) {
      resBar[i].classList.toggle("active");
   }
   document.querySelector(".sidebar-slide").classList.toggle("active");
}

// get all links inside the sidebar menu
const sidebarLinks = document.querySelectorAll(".sidebar-menu a");

// add event listener to each link
sidebarLinks.forEach((link) => {
   link.addEventListener("click", () => {
      sidebarMenuAction();
   });
});

//========== CLONE MANU TO SIDEBAR ==========>


const heroItem = document.querySelectorAll('.hero-content-box .el-absolute');

window.addEventListener('load', ()=>{
   let counter = 0;
   let heroTimer = setInterval(() => {
      if (counter <= heroItem.length - 1) {         
         heroItem[counter].classList.add('active')
         counter++;
      }else{
         clearInterval(heroTimer);
      }
   }, 100);
})


// counterUp
const countings = document.querySelectorAll(".counting");
const speed = 200;
countings.forEach((counting) => {
	let h = 0;
	const updateCount = () => {
	const target = +counting.getAttribute("data-target");
	const count = +counting.innerText;
	const inc = target / speed;
	if (count < target) {
		counting.innerText = Math.ceil(count + inc);
		setTimeout(updateCount, 1);
	} else {
		counting.innerText = target;
	}
	};
	window.addEventListener("load", () => {
		countingNum()
	});
	window.addEventListener("scroll", () => {
		countingNum()
	});

	function countingNum() {
		let countingTop = counting.getBoundingClientRect().top;
		if (countingTop <= window.innerHeight && h == 0) {
			updateCount();
			h = 1;
		}
	}
});

// ===================
// Contact form
// ===================

      var a = new Date();
      var arrival = Math.floor(a.getTime() / 1000);
      document.getElementById("arrival").value = arrival;

function generateToken() {
  var d = new Date();
  var timestamp = Math.floor(d.getTime() / 1000);
  var domain = window.location.hostname;
  var token = domain + '_' + timestamp;

  var encodedToken = btoa(token);

  document.getElementById("token").value = encodedToken;
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
event.preventDefault();
generateToken();
var form = event.target;
var formData = new FormData(form);
var request = new XMLHttpRequest();
request.open("POST", "contact.php");
request.onreadystatechange = function() {
  if (request.readyState === XMLHttpRequest.DONE) {
	if (request.status === 200) {
	  form.reset();
	  document.querySelector(".contact-form").innerHTML = "<p>Thank you for contacting us. We'll get back to you soon!</p>";
	} else {
	  document.getElementById("contact-form-error").innerHTML = request.responseText;
	}
  }
};
request.send(formData);
});
	
	
// ===================
// Calculator 
// ===================

// Get the input fields and revenue field
const productPriceInput = document.getElementById("product-price");
const monthlyVisitorsInput = document.getElementById("monthly-visitors");
const conversionRateInput = document.getElementById("conversion-rate");
const revenueInput = document.getElementById("revenue");

// Add blur event listeners to the input fields to format them when the user finishes editing
productPriceInput.addEventListener("blur", formatProductPriceInput);
monthlyVisitorsInput.addEventListener("blur", formatMonthlyVisitorsInput);
conversionRateInput.addEventListener("blur", formatConversionRateInput);

// Calculate and update the revenue field based on the inputs
const updateRevenue = () => {
   // Get the values from the input fields
   const productPrice = parseFloat(productPriceInput.value.replace("$", "").replace(",", ""));
   const monthlyVisitors = parseFloat(monthlyVisitorsInput.value.replace(",", ""));
   const conversionRate = parseFloat(conversionRateInput.value.replace("%", ""));
   
   // Calculate the revenue
   let revenue = productPrice * monthlyVisitors * (conversionRate / 100);
   
   // Format the revenue and update the revenue field
   revenue = "$" + revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
   revenueInput.value = revenue;
}

// Call updateRevenue when any of the input fields change
productPriceInput.addEventListener("input", updateRevenue);
monthlyVisitorsInput.addEventListener("input", updateRevenue);
conversionRateInput.addEventListener("input", updateRevenue);

// Function to format the product price input
function formatProductPriceInput() {
   const value = productPriceInput.value;
   if (value) {
      const formattedValue = "$" + parseFloat(value.replace(/[^0-9\.]/g, "")).toLocaleString("en-US", {maximumFractionDigits:2, minimumFractionDigits:2});
      productPriceInput.value = formattedValue;
   }
}

// Function to format the monthly visitors input
function formatMonthlyVisitorsInput() {
   const value = monthlyVisitorsInput.value;
   if (value) {
      const formattedValue = parseFloat(value.replace(/[^0-9]/g, "")).toLocaleString("en-US");
      monthlyVisitorsInput.value = formattedValue;
   }
}

// Function to format the conversion rate input
function formatConversionRateInput() {
   const value = conversionRateInput.value;
   if (value) {
      const formattedValue = parseFloat(value.replace(/[^0-9\.]/g, "")).toLocaleString("en-US", {maximumFractionDigits:2, minimumFractionDigits:2}) + "%";
      conversionRateInput.value = formattedValue;
   }
}

// Resize logo
window.onload = function() {
function resizeLogo() {
	  var logo = document.querySelector(".logo");
	  var logoWidth = logo.offsetWidth;
	  var contentWidth = 0;
	  var contentElements = logo.querySelector(".logo-zoom").children;
	  for (var i = 0; i < contentElements.length; i++) {
		contentWidth += contentElements[i].offsetWidth;
	  }
	  var zoom = logoWidth / contentWidth * 90;
	  console.log(zoom);
	  if (window.innerWidth < 768 && zoom < 100) {
		  logo.querySelector(".logo-zoom").style.zoom = zoom + "%";
	  } else {
		  logo.querySelector(".logo-zoom").style.zoom = "100%";
	  }
}

  window.addEventListener("resize", resizeLogo);
  resizeLogo();
  
  function resizeMobileLogo() {
	  var logo = document.querySelector(".sidebar-menu");
	  var logoWidth = logo.offsetWidth;
	  var contentWidth = 0;
	  var contentElements = logo.querySelector(".logo-mobile-zoom").children;
	  for (var i = 0; i < contentElements.length; i++) {
		contentWidth += contentElements[i].offsetWidth;
	  }
	  var zoom = logoWidth / contentWidth * 90;
	  console.log(zoom);
	  if (zoom < 100) {
		  logo.querySelector(".logo-mobile-zoom").style.zoom = zoom + "%";
	  } else {
		  logo.querySelector(".logo-mobile-zoom").style.zoom = "100%";
	  }
}

  window.addEventListener("resize", resizeMobileLogo);
  resizeMobileLogo();
}