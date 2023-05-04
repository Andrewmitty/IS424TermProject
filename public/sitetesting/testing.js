//import puppeteer

const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 15,
  });

  const page = await browser.newPage();

  //site to be tested
  await page.goto("https://sugar-and-lime.web.app/");

  //USER SIGN UP
  //   //user click the signup button
  //   await page.click("#signup");
  //   //user will provide email + password information
  //   await page.type("#signupEmail", "rghaynes@wisc.edu");
  //   await page.type("#signupPassword", "haynes23");
  //   //user click submit
  //   await page.click("#signupDone");

  //USER SIGN IN
  //   // user click the login button
  //   await page.click("#signin");
  //   //user will provide email + password info
  //   await page.type("#signinEmail", "rghaynes@wisc.edu");
  //   await page.type("#signinPassword", "haynes23");
  //   //user click submit
  //   await page.click("#signinDone");

  //NAVIGATION OF NAVBAR ITEMS (EXLCUDING CONTACT)
  //   // click link to menu
  //   await page.click(
  //     "body > div.navbar.is-primary.is-spaced.mb-0 > div.navbar-menu.has-text-link > div.navbar-start > a.navbar-item.has-text-linklight > p"
  //   );
  //   // click link to about us
  //   await page.click(
  //     "body > div.navbar.is-primary.is-spaced.mb-0 > div.navbar-menu.has-text-link > div.navbar-start > a:nth-child(3)"
  //   );
  //   //click link to location
  //   await page.click(
  //     "body > div.navbar.is-primary.is-spaced.mb-0 > div.navbar-menu.has-text-link > div.navbar-start > a:nth-child(5)"
  //   );

  //NAVIGATION OF FOOTER ITEMS
  //click facebook link
  //   await page.click("body > footer > div > div:nth-child(1) > a");
  //clcik instagram link
  //   await page.click("body > footer > div > div:nth-child(2) > a");
  //click maps link
  //   await page.click(
  //     "body > footer > div > div.level-item.has-text-centered > a"
  //   );

  //CONTACT US FORM SUBMISSION
  //   //click link to contact page
  //   await page.click(
  //     "body > div.navbar.is-primary.is-spaced.mb-0 > div.navbar-menu.has-text-link > div.navbar-start > a:nth-child(4)"
  //   );
  //   //name
  //   await page.type("#contactName", "TestName");
  //   //email
  //   await page.type("#contactEmail", "test@test.com");
  //   //phone #
  //   await page.type("#contactPhone", "(XXX)-XXX-XXXX");
  //   //email preference
  //   //   await page.click("#contactPrefMethod > label:nth-child(1)");
  //   //phone preference
  //   await page.click("#contactPrefMethod > label:nth-child(2)");
  //   //reason for contact
  //   //   await page.select("#contactReason", "Question");
  //   //   await page.select("#contactReason", "Order Request");
  //   await page.select("#contactReason", "Other");
  //   //message
  //   await page.type(
  //     "#contactText",
  //     "This is a Test Before We Turn in the Project"
  //   );
  //   //submit
  //   await page.click("#contactSubmit");

  //PLACING AN ORDER
  //   //nav to menu
  //   await page.click(
  //     "body > div.navbar.is-primary.is-spaced.mb-0 > div.navbar-menu.has-text-link > div.navbar-start > a.navbar-item.has-text-linklight > p"
  //   );
  //   //sign in requied prior to prior to checking out
  //   await page.click("#signin");
  //   await page.type("#signinEmail", "rghaynes@wisc.edu");
  //   await page.type("#signinPassword", "haynes23");
  //   await page.click("#signinDone");
  //   //picking menu items
  //   await page.click("#tileParApps > div:nth-child(1) > button");
  //   await page.click("#tileParMain > div:nth-child(2) > button");
  //   await page.click("#tileParDesserts > div:nth-child(3) > button");
  //   await page.click("#tileParCakes > div:nth-child(1) > button");
  //   await page.click("#tileParCupcakes > div:nth-child(1) > button");
  //   await page.click("#tileParDrinks > div:nth-child(2) > button");
  //   //clear cart
  //   await page.click('#ClearCartButton');
  //   //click checkout button
  //   await page.click("#CheckoutButtonCart");
  //   //filling out order form
  //   await page.type("#checkoutName", "TestName");
  //   await page.type("#checkoutEmail", "test@test.com");
  //   await page.type("#checkoutPhone", "XXX-XXX-XXXX");
  //   await page.type("#checkoutSpecialNotes", "None");
  //   //submit
  //   await page.click("#PlaceOrderBtn");

  //ADMIN PAGE
  // admin login
  await page.click("#signin");
  await page.type("#signinEmail", "rghaynes@wisc.edu");
  await page.type("#signinPassword", "haynes23");
  await page.click("#signinDone");
  // nav to admin page
  await page.waitForTimeout(1000);
  await page.click("#adminLink");

  //DIFFERENT ADMIN FUNCTIONS - AFTER NAVIGATION TO THE PAGE
  //   //View All Orders
  //   await page.click("#allOrdersBtn");
  //   //Complete an Order
  //   await page.waitForTimeout(1000);
  //   await page.click("#ordersColumn > div:nth-child(2) > button");

  //Delete Response
  // await page.click('#contactColumn > div:nth-child(3) > button');

  //Make User an Admin
  //await page.click('#usersColumn > div:nth-child(3) > button');

  //Add an Item
  //click add item button
  //   await page.click("#addItemBtn");
  //input information
  //   await page.type("#itemName", "TestItem");
  //   await page.select("#itemCat", "Mains");
  //   await page.type("#itemPrice", "XX.XX");
  //   await page.type("#itemDesc", "Test Description");
  //addition of image
  //   await page.click("#itemImage");
  //   await page.click("#submitItem");
}

//call the go
go();
