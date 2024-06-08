# My Sport Time

# [CHANGELOG](CHANGELOG.md)

# Introduction

This document serves as the comprehensive back-end technical document for ***My Sport Time*** project. Its purpose is to establish a clear definition of the system's flows, objects, data types, and logical requirements. By outlining these key aspects, this document provides a solid foundation for the development and implementation of ***My Sport Time*** project.

# Project Definition

My Sport Time is a reservation software project specifically designed for sport coaches. This software aims to streamline the process of managing and scheduling sports activities, making it easier for coaches to coordinate with their customers and plan training sessions. With My Sport Time, coaches can efficiently manage their schedules, track attendance, and communicate important information to their athletes.

# Technical Configuration

# Users of the System

- **Customers**: Individuals who use the ***My Sport Time*** reservation software for their sports activities.
- **Guest:** Individuals who could browse My Sport Time data and see availabilities. For proceeding the payment flow, guests should register first and then could purchase a session.( the selected session data could be saved as cookie and after registration it could be submitted.)
- **Coaches**: Sports coaches who use the software to manage their training schedules, communicate with athletes, and track attendance.
- **Administrators**: Individuals in charge of overseeing the overall functionality and maintenance of the My Sport Time system.

# Key Flows of the System

## Users Registration

The registration process should include collecting necessary user information such as **name**, **email**, and **password**. After registration, users should be able to log in using their credentials. To ensure security and authenticity, a **verification process** should be implemented to confirm the user's identity.

## Customers-Coaches Match Making

Customers can search for coaches based on their **sport type (category), session type (sub-category), location**, and **availability** in their timetable. This allows customers to find coaches who specialize in their specific sport and can offer training sessions that align with their needs and goals. Customers can consider factors like location and coach availability to find a convenient training option.

## Coach Calendar & Event Management

Coaches should have a calendar feature to manage schedules. They can **add training sessions, events**, and **availability slots**.

## Training Session Booking

Customers should be able to book training sessions with coaches through the system. The booking process should allow customers to select a **specific date** and **time**. Real-time availability information should be provided. Confirmation notifications should be sent to both customers and coaches via **email**. Customers should have the option to **cancel** or **reschedule** sessions.

## Payment Integration

The system should integrate a **payment gateway** for customers to make payments for their booked sessions. The payment integration should support various methods.

## Reporting and Analytics

The system should generate **comprehensive reports** and **analytics** for **administrators**, **coaches**, and **customers**. Administrators can access reports on **session attendance**, **revenue**, and **overall performance**. Coaches and customers can access reports on **booking schedules**.

# User Stories and Processes

## Customer

### Customer Registration and Account Management

- User fills in their basic information *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=489-3567&mode=design&t=IGQEDGkiWtNxJ9KH-0)*:
  - first name
  - last name
  - email (unique between customers and coaches)
  - password (at least 6 characters, containing symbols and numbers)
- The customer will receive a verification email including a verification link.
- The customer can request a new verification email after some minutes.
- By clicking on the verification link, the customer will be asked to fill in their details *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=489-3671&mode=design&t=IGQEDGkiWtNxJ9KH-0)*:
  - Location (Standard *Google Maps* Address)
  - Sport Interests
  - Profile Picture
- Customers can edit their profile information *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1063-2488&mode=design&t=IGQEDGkiWtNxJ9KH-0)*
  - change/remove profile picture
  - first name
  - last name
  - ~~email address~~

<aside>
✅ **QUESTION 1:** Should the email address be verified after modification? If yes, what functionalities should be disabled before verification succeeds?
**ANSWER:** We do not support changing email addresses.

</aside>

- Customers can update their password after they log in.

  These values are required:

  - Current Password
  - New Password

### Customers Management (Administrator Panel)

- Admin can view a paginated list of customers. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1382-4115&mode=design&t=IGQEDGkiWtNxJ9KH-0)*

  The report includes this information:

  - Total count of customers
  - For each customer:
    - Customer name
    - Profile picture
    - Location
    - Sport
    - Email address
- Admin can Block or Unblock a customer.

## Coach

### Coach Registration and Account Management

- User fills in their basic information *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=275-549&mode=design&t=IGQEDGkiWtNxJ9KH-0)*
  - First name
  - Last name
  - Email
  - Password (min **6 characters**, containing **symbols** and **numbers**)

<aside>
✅ **QUESTION 2**: As we have a *[shared login page](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=275-475&mode=design&t=IGQEDGkiWtNxJ9KH-0)* for both **customers** and **coaches**, What happens when someone tries to **register as a coach** with an email that is **being used** by another **customer account**?
**Example**: A user who is currently working as a **tennis coach** on the platform, tries to **book a football training session** from another coach.

---

**ANSWER:** on registration process for both customer and coach, system requires to check whether the email address is unique between two collections.

</aside>

- The coach will receive a verification email, including a verification link.
- A coach can request a new verification email after some minutes.
- By clicking on the verification link, the coach will be asked to fill in their details.

  These details are:

  - Profile Picture
  - Bio ( at least 100 characters )
  - Language (could be multiple) *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1269-3098&mode=design&t=IGQEDGkiWtNxJ9KH-0)*
  - Sport
  - Sport Type (could be multiple ) *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1269-2981&mode=design&t=IGQEDGkiWtNxJ9KH-0)*
  - Expertise Level
  - Experience in years
  - Location ~~(could be multiple)~~ *[ Ref Question 3] [[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=989-3294&mode=design&t=IGQEDGkiWtNxJ9KH-0)*
  - Areas of Specialism *[ Ref Question 4 ] [[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=989-3294&mode=design&t=IGQEDGkiWtNxJ9KH-0)*
  - Qualifications (could be multiple)
    - Title
    - Description
    - Expiry Date (should not be expired)
    - Document File *[Ref Question 5]*

  🌐 **POST** `/api/app/coach/auth/register/profile`

<aside>
✅ **QUESTION 3**: The location input title is **“Location and name of club/clubs sessions are delivered”** in the UI *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=989-3294&mode=design&t=IGQEDGkiWtNxJ9KH-0),* but the input looks like is supposed to only accept one address. Can a coach define more than one location for their activities?

---

**ANSWER**: a coach can only insert one location.

</aside>

<aside>
✅ **QUESTION 4**: What is the type of data asked as **“Areas of specialism”**? If it is a simple `text`, does it have any functionality in the system?

---

**ANSWER**: it is a simple text, no functionality required.

</aside>

<aside>
✅ **QUESTION 5**: What are **approved** file formats for **Qualifications Document Files**?

---

**ANSWER:** pdf, jpeg, jpg, png formats with max 5MB size

</aside>

- A coach could submit their address information.

  - Country
  - City
  - Address Line 1
  - Address Line 2
  - ZIP/Postal Code
  - Phone Number

  🌐 **POST** `/api/app/coach/auth/register/billing-address`
- Coach can view the subscription information before selecting a plan.

  This information is

  - title
  - monthly cost
  - promotion cost

  🌐 **POST** `/api/app/coach/plan/list`
- After completing the coach information, they should select a subscription plan and pay for it. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=338-452&mode=design&t=zSyejHoSLsUI1ExX-0)*

  - Card Details
    - Card Number
    - Name on the card
    - Expiry Date
    - CVC
  - Billing Address
    - Address Line 1
    - Address Line 2
    - City
    - Country
    - Post Code
  - Promote my profile
  - Plan

  🌐 **POST** `/api/app/coach/auth/register/subscription`
- When the subscription plan payment is successful, The coach should wait for admin review.
- An active coach can update their account information.

  - change profile picture
  - first name
  - last name
  - phone number
  - bio
  - address
    - country
    - address line 1
    - address line 2
    - city
    - zip code
  - role details
    - sport
    - sport type
    - expertise level
    - experience in years
    - areas of specialism
    - language

  🌐 **PUT** `/api/app/coach/{coachId}`
- An active coach can add a new certificate to their account.

  🌐 **POST** `/api/app/coach/certificate`
- An active coach can view their certificates. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=457-1475&mode=design&t=7e9SdJThGk3TmNO8-0)*

  🌐 **GET** `/api/app/coach/certificate`
- An active coach can remove a certificate from their account.

  🌐 **DELETE** `/api/app/coach/certificate/{certificateId}`
- An active coach can update certificate details in their account.

  - Upload a new Document File
  - title
  - description
  - expiry date ( should not be expired )

  🌐 **PUT** `/api/app/coach/certificate/{certificateId}`
- A coach can request a new phone verification code.

  🌐 **POST** `/api/app/coach/verification/phone/resend`
- A coach can verify their phone number by using the sent verification code.

  🌐 **POST** `/api/app/coach/verification/phone`
- An active coach can change their password.

  These values are required:

  - Old Password
  - New Password

  🌐 **PATCH** `/api/app/coach/auth/password`

### Coaches Management (Administrator Panel)

- Admin can view a paginated list of coaches *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1302-1473&mode=design&t=Po5EhVSu2W3VBZb9-0)*

  The report includes this information:

  - coach name
  - role
  - total hours [QUESTION 6]
  - language
  - location
  - profile picture
  - total earnings

  🌐 **GET** `/api/admin/coach`

  <aside>
    ✅ **QUESTION 6:** How the *total hours* value should be generated?

  ---

  **ANSWER:** sum of past sessions duration.


  </aside>
- Admin can search through coaches.

  Search is based on

  - name
  - email

  🌐 **GET** `/api/admin/coach`
- Admin can block/unblock a coach.

  🌐 **POST** `/api/admin/coach/{coachId}/block`

<aside>
✅ **QUESTION 7:** What happens to bookings of a blocked coach?

---

**ANSWER:** all upcoming bookings should be cancelled automatically.

</aside>

- Admin can view details of a coach.

  - first name
  - last name
  - role
  - email
  - year experience
  - phone number
  - location
  - work postcode
  - areas of specialism
  - Qualifications:
    - file document
    - title
    - description
    - expiry date
  - address
    - country
    - city
    - Address Line 1
    - ZIP code
    - Phone number

  🌐 **GET** `/api/admin/coach/{coachId}`
- Admin can view coach sign-up requests

  The report can be filtered by:

  - status: **pending** or **rejected**

  The report includes this information:

  - first name
  - last name
  - location
  - role
  - experience
  - areas of specialism
  - language

  🌐 **GET** `/api/admin/coach/request`
- Admin can Approve a sign-up request.

  🌐 **POST** `/api/admin/coach/request/approve`
- Admin can Reject a sign-up request.

  Coach email and phone number should be available for new registration.

  🌐 **POST** `/api/admin/coach/request/reject`

### Finding Coaches

Customers or guests can browse coaches and get their information.

- Customers or guests can view coach profiles. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=647-758&mode=design&t=Po5EhVSu2W3VBZb9-0)*

  - first name
  - minimum rate per hour
  - role
  - next available time *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=647-758&mode=design&t=Po5EhVSu2W3VBZb9-0)* *[Question 8]*
  - location
  - language
  - about
  - area of specialism
  - qualifications (multiple)
    - title
    - description
  - availability calendar (monthly view)
  - rate
    - average score
    - total reviews
    - count of reviews per score band *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=647-758&mode=design&t=Po5EhVSu2W3VBZb9-0)*
  - reviews (multiple)
    - title
    - description
    - rate out of 5
    - author customer name
    - date
    - helpfulCount *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=647-758&mode=design&t=Po5EhVSu2W3VBZb9-0)*
  - teaching location
    - address
    - title
    - coordinates
  - min hourly rate

  🌐 **GET** `/api/app/coach/{coachId}`

<aside>
✅ **QUESTION 8:** There is a **time picker** on this page [[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=655-646&mode=design&t=Po5EhVSu2W3VBZb9-0), indicating which time frames are **booked** and how much the available time frames **cost**. Although booked time frames or the cost of available time frames rely on **coaches’ preferences**. How these items should be calculated as there is **no coach selected**?

---

**ANSWER**: These values are the minimum cost in that time frame.

</aside>

- Customer or guest can get a **paginated** list of available coaches based on a date. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=655-646&mode=design&t=Po5EhVSu2W3VBZb9-0)*

  these are the search options:

  - date
  - duration (in minutes)
  - distance (in miles)
  - distance from point: coordinates

  the result items contain:

  - coach information

    - first name
    - last name
    - promoted: boolean *[QUESTION 9] [[Ref figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=338-452&mode=design&t=ozFUNMXtC8LoFDQU-0)*
    - location
    - role
    - minimum rate per hour
    - count of bookings: How many people already booked this coach
    - experience years
    - expertise level
    - average rate: a number between 1 to 5

    🌐 **GET** `/api/app/coach/explore`

    <aside>
      ❓ QUESTION 9:….
      NOTE: on coaches list 3 top items are random promoted items.

    </aside>
- Customers or guests can get a **paginated** list of available coaches based on location. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=559-487&mode=design&t=Po5EhVSu2W3VBZb9-0)*

  the report options are:

  - sport category
  - location
  - sort: **Nearest to me, Price** or **Coach Rating**
  - filters:
    - **distance**: from *1 mile* to *nationwide*
    - **expertise level**
    - **minimum rating**
    - **price range**

  Report items containing:

  - coach information:
    - first name
    - last name
    - role
    - category
    - minimum income rate per hour
    - location
    - experiences in year
    - expertise level
    - average rate: a number between 0 to 5
    - promoted: boolean  *[QUESTION 10]*
  - next available date and time
  - count of bookings: How many people already booked this coach

  🌐 **GET** `/api/app/coach/explore`

<aside>
✅ **QUESTION 10:** Considering the fact that all active coaches are verified before their activation by admins, how a coach can achieve a verified badge? 
**ANSWER:** The icons are promoted badge.

</aside>

## Sport Categories

### Customer-Side

- Customers or guests can get the list of categories. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1289-891&mode=design&t=Po5EhVSu2W3VBZb9-0)*

  The items information are:

  - category name
  - count of coaches
  - count of locations
  - status: **active**, **coming-soon**
  - slug

  🌐 **GET** `/api/app/sport`
- Customers or guests can access sports category information and analytics by their **slug**. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=752-1411&mode=design&t=Po5EhVSu2W3VBZb9-0)*

  This information is:

  - coaches in this category count
  - locations related to this category count
  - average feedback to the coaches in this category
  - bookings related to this category count *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=752-1411&mode=design&t=Po5EhVSu2W3VBZb9-0)*
  - category cover image
  - sessions ( sub-categories ): *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=752-1411&mode=design&t=Po5EhVSu2W3VBZb9-0)*
    - title
    - description
    - cover image
      NOTE: check dynamic category pages in admin [[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=2175-4415&mode=design&t=ozFUNMXtC8LoFDQU-0)

  🌐 **GET** `/api/app/sport/{slug}`

### Admin-Side

- Admin can view a paginated list of sport categories. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=2145-3169&mode=design&t=OVfYWECjIe8FRWjd-0)*

  This report items contain:

  - title
  - description
  - status: **active**  or **inactive**
  - icon
  - cover image

  This report stats contain:

  - total count of sports

  🌐 **GET** `/api/admin/sport`
- Admin can activate / deactivate a sport category. *[QUESTION 26]*

  🌐 **PUT** `/api/admin/sport`

<aside>
✅ **QUESTION 26:** What happens to related data when a category is deactivated?
Examples:
- Coaches who chose the category on their profile
- Past or Upcoming Bookings of a session related to this category

---

**ANSWERS:** No changes are required to previous submitted items, But new items could not be generated with this category.

</aside>

- Admin can create a new sport category. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=2175-4415&mode=design&t=OVfYWECjIe8FRWjd-0)*

  - cover image
  - icon image
  - title
  - description (max 100 characters)
  - offers *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=2175-4415&mode=design&t=OVfYWECjIe8FRWjd-0) (0, 3 or 6 items)*
    - title
    - photo
    - description (max 100 characters)
    - link
  - session types (3 or 6 items)
    - photo
    - title
    - description (max 100 characters)

  🌐 **PUT** `/api/admin/sport`

<aside>
✅ **QUESTION 27:** There are two numbers on the Offers and Sessions sections, called Min and Max *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=2175-4415&mode=design&t=OVfYWECjIe8FRWjd-0)*. What is the purpose of these values?

---

**ANSWER:** There could be 3 or 6 items for offers or sessions. As an example 4 offers are not allowed.

</aside>

- Admin can edit a sport category, alongside its sessions. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=2145-3644&mode=design&t=OVfYWECjIe8FRWjd-0)*

  - cover image
  - icon image
  - title
  - description (max 100 characters)
  - offers *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=2175-4415&mode=design&t=OVfYWECjIe8FRWjd-0)*
  - session types
    - photo
    - title
    - description (max 100 characters)

  🌐 **PUT** `/api/admin/sport/{sportId}`

## Booking

### Customer-Side

- Customer can review the booking details. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=900-771&mode=design&t=Po5EhVSu2W3VBZb9-0)*

  - coach
    - coach picture
    - first name
    - last name
  - session preferences
    - category
    - session type (sub-category)
    - duration: could be empty
    - location
    - date and time
  - price details
    - session price
    - booking fee
    - subtotal
    - total to pay

  🌐 **GET** `/api/app/customer/booking/preview`
- Customer can checkout the selected session.

  🌐 **POST** `/api/app/customer/booking/checkout`
- Customer can purchase a session and book the coach.

  information required for booking:

  - coach
  - category
  - session (sub-category)
  - location
  - date and time
  - duration (minutes)
  - discount code *[QUESTION 11]*

  🌐 **POST** `/api/app/customer/booking/{bookingId}/purchase`

<aside>
❓ **QUESTION 11:** Considering there is no proper way to create a new discount code in the admin panel, how does the discount code *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=900-771&mode=design&t=Po5EhVSu2W3VBZb9-0)* work in the purchasing process?
ANSWER: it should be inserted manually.
The discount data type is unclear, need to discuss

</aside>

<aside>
✅ **QUESTION 12:** Should the system, lock the available time for a while when a customer enters the checkout process? If yes, how many minutes should the system wait for payment?
**ANSWER:** Yes, 5 mins. If the checkout process took more than 5 minutes, it should be failed and customer could try again.

</aside>

- Customer can view a list of upcoming bookings they already purchased. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=391-343&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  The report items contain:

  - coach first name
  - coach last name
  - booking rate per hour
  - start date and time
  - end date and time
  - category
  - session type(sub-category)
  - reference number
  - location
    - country
    - city
    - address
    - coordinates

  The report stats should include:

  - Upcoming bookings total count
  - Past bookings total count

  🌐 **GET** `/api/app/customer/booking`
- Customer can view a list of their past bookings. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=391-1704&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  the report items contain:

  - coach first name
  - coach last name
  - booking rate per hour
  - start date and time
  - end date and time
  - category
  - session type(sub-category)
  - reference number
  - location
    - country
    - city
    - address
    - coordinates

  The report stats should include:

  - Upcoming bookings total count
  - Past bookings total count

  🌐 **GET** `/api/app/customer/booking`
- Customer can request a refund for a booking. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1051-929&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  this information is required:

  - reason

  🌐 POST `/api/app/customer/booking/{bookingId}/refund`

<aside>
✅ **QUESTION 13:** The cancellation process by customer is unclear [[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1107-1118&mode=design&t=Ur0SapC3vj8jdrU5-0). Is cancellation a different flow of refunding?
Also there is a rules explanation in the page that seems to be for coach, not customer. Could you please clarify this section?
Rules explanation quote from the page:

*If you cancel your session more than 48 hours in advance, you're entitled to a full refund minus transaction fees.*

*For cancellations made 24 to 48 hours before, a 50% refund applies, also minus transaction fees. Unfortunately, cancellations made less than 24 hours prior to the session cannot be refunded.

**ANSWER:** Refund is for past bookings, cancel is for upcoming bookings. cancel is automatic, refund is manual. Also refunds should be emailed to admins.
Cancellation Rules should be clarified in a meeting.*

</aside>

<aside>
✅ **QUESTION 14:** There are some prices in $ and some others are in £. Should the system handle both currencies?

**ANSWER:** All costs are in GBP.

</aside>

### Coach-Side

- Coach can view their upcoming bookings. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=438-2540&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  the report items should contain:

  - Customer Name *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=438-2540&mode=design&t=Ur0SapC3vj8jdrU5-0) [QUESTION 15]*
  - Customer Picture
  - Start Date
  - End Date
  - Location:
    - country
    - city
    - address
    - coordinates
  - Reference Number
  - Hourly Cost
  - Category
  - Session Type (Sub-category)

  The report stats should include:

  - Upcoming bookings total count
  - Past bookings total count

  🌐 **GET** `/api/app/coach/booking`

<aside>
✅ **QUESTION 15**: As this report meant for coach view, the Supplier Name (coach name) is always the user name for all items. Should this be replaced with **customer name**?
**ANSWER:** customer name

</aside>

- Coach can view their past bookings. *[no figma reference available] [*QUESTION 16]

  🌐 **GET** `/api/app/coach/booking`

<aside>
✅ **QUESTION 16:**  As there wasn’t any page related to [past tab](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=438-2540&mode=design&t=Ur0SapC3vj8jdrU5-0) in the coach panel, is the list the same as the [upcoming](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=438-2540&mode=design&t=Ur0SapC3vj8jdrU5-0) one? 
**ANSWER:** it is same as upcoming, without cancel

</aside>

- Coach can cancel a booking. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1053-1363&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  🌐 **POST** `/api/app/coach/booking/{bookingId}/cancel`

<aside>
✅ **QUESTION 17:** What are the cancellation terms? Is the **QUESTION 13** quote related to this subject?
**ANSWER:** All the charged amount would be refunded automatically.

</aside>

- Coach can view their bookings on the calendar. [[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=510-1457&mode=design&t=Ur0SapC3vj8jdrU5-0)

  The data provided on this page could be gathered by a period. Different views like the Week view could be handled on the client side.

  The report request contains:

  - Start Date Range
  - End Date Range

  The report items contain:

  - Booking information
    - Category
    - Sub-category
    - customer name
    - start date
    - end date
    - first name

  The report stats contain:

  - Total count of students attending the sessions in the date range.
  - Total count of students attending the sessions today.

  🌐 **GET** `/api/app/coach/booking/calendar`

<aside>
✅ **QUESTION 18:** There is a $14 value on a block of the calendar [*[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=510-1457&mode=design&t=Ur0SapC3vj8jdrU5-0).* What is the purpose of it?
**ANSWER**: it is a typo

</aside>

### Admin-Side

- Admin can view the bookings list. [[*figma]*](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1344-2611&mode=design&t=Ur0SapC3vj8jdrU5-0)

  The report options are:

  - report type:
    - upcoming
    - past
    - canceled
  - sort by: *[QUESTION 19]*
    - category + sub-category
    - start date
    - coach name
    - customer name
    - reference number
  - search query by:
    - customer name
    - customer email
    - coach name
    - coach email
    - reference code

  The report items contain:

  - category
  - sub-category
  - start date
  - coach
    - name
    - profile picture
  - customer
    - name
  - reference number

  The report stats contain:

  - total count of each report type:
    - upcoming
    - past
    - canceled

  🌐 **GET** `/api/admin/booking`

<aside>
✅ **QUESTION 19:** There is a drop down menu labeled with “Sort By” *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1344-2611&mode=design&t=Ur0SapC3vj8jdrU5-0)*, alongside with sort arrows on the table columns *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1344-2611&mode=design&t=Ur0SapC3vj8jdrU5-0)*.  What is the purpose of the dropdown menu?
**ANSWER**: dropdown removed.

</aside>

- Admin can view booking details. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1370-3611&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  - coach *[QUESTION 20]*
    - first name
    - last name
    - profile picture
    - phone
  - customer
    - first name
    - last name
    - phone
  - location
  - category
  - session type (sub-category)
  - reference number
  - total price *[QUESTION 21]*
  - duration in minutes
  - start date

  🌐 **GET** `/api/admin/booking/{bookingId}`

<aside>
✅ **QUESTION 20**: There is personal information like name and profile picture on the booking details modal *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1370-3611&mode=design&t=Ur0SapC3vj8jdrU5-0).* Is this information related to coach?
**ANSWER:** modified

</aside>

<aside>
✅ **QUESTION 21:** Is total price *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1370-3611&mode=design&t=Ur0SapC3vj8jdrU5-0)*, same as hourly cost or should the system calculate it based on the session duration and hourly rate provided in the booking information?
**ANSWER:** It is the session cost.

</aside>

## Feedback

- Customer can submit feedback on a session (booking). *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1063-2032&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  this information are required:

  - score between 0 to 5.
  - feedback text

  🌐 **POST** `/api/app/customer/feedback`
- Coach can view feedbacks customers submitted on them. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=454-778&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  The report options:

  - score:
    - all
    - 1
    - 2
    - 3
    - 4
    - 5

The report items contain:

- customer
  - first name
  - last name
  - profile picture
- score
- feedback text
- date

🌐 **GET** `/api/app/customer/feedback`

🌐 **GET** `/api/app/coach/feedback`

## Available Times

- Coach can submit their available time settings for each week days (Saturday, Sunday, etc.). *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=557-907&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  - Working hours: an array of working hours including:
    - weekday
    - start time
    - end time
    - price per hour

  🌐 **POST** `/api/app/coach/available-time`
- Coach can view their available time settings.

  🌐 **GET** `/api/app/coach/available-time`

## Notification

- ~~Customer can set their notifications settings. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1070-733&mode=design&t=Ur0SapC3vj8jdrU5-0) [QUESTION 22] removed*~~

<aside>
✅ **QUESTION 22:** As the customer notifications settings page *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1070-733&mode=design&t=Ur0SapC3vj8jdrU5-0)* is vague, could you please explain
1. what are the notification categories? **booking-confirmation, 24hrs reminder, session canceled**
2. when the system should notify the customer?
3. which notifications can be disabled.? **removed**
4. how do we notify the customer? (e.g. via email) **internal notifications + email**

</aside>

- Customer can view a list of their notifications. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=381-167&mode=design&t=Ur0SapC3vj8jdrU5-0)*

  The report is sorted **descending** by **date**.

  The report items contain:

  - title
  - description
  - notification category *[QUESTION 22]*
  - date
- Admin can view a list of their notifications. *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1388-5301&mode=design&t=Ur0SapC3vj8jdrU5-0) [QUESTION 23]*

  The report is sorted **descending** by **date**.

  The report items contain:

  - notification category *[QUESTION 24]*
  - member
    - member type:
      - customer
      - coach
    - first name
    - last name
    - profile picture
    - location
  - sport category
  - date

<aside>
✅ **QUESTION 23:** How is the **New** section in the admin notifications list page *[[figma]](https://www.figma.com/file/dfBqqZgc7Lyh1a7KPp9ZXo/My-Sport-Times?type=design&node-id=1388-5301&mode=design&t=Ur0SapC3vj8jdrU5-0) filtered? I didn’t find read / unread flag on notifications for other customers. Do notifications here have read / unread flag?*
**ANSWER:** A flag is required

</aside>

<aside>
✅ **QUESTION 24:** Could you please list circumstances when the system should notify admin?
**ANSWER**: sign up, book , cancel, internal notification only

</aside>

# Data Types

## Customer

| KEY NAME      | VALUE TYPE   | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION                                               |
| ------------- | ------------ | ------------- | -------- | ------ | --------------------------------------------------------- |
| ID            | ObjectId     |               | ✔       | ✔     |                                                           |
| firstName     | string       |               | ✔       |        |                                                           |
| lastName      | string       |               | ✔       |        |                                                           |
| location      | Address      |               |          |        |                                                           |
| picture       | URL          |               |          |        |                                                           |
| interests     | CategoryId[] |               |          |        |                                                           |
| email         | string       |               | ✔       | ✔     | should be unique in both customers and coaches collection |
| createdAt     | Date         | current time  |          |        |                                                           |
| updatedAt     | Date         | current time  |          |        |                                                           |
| status        | active       | deleted       | active   | ✔     |                                                           |
| blocked       | boolean      | false         | ✔       |        |                                                           |
| emailVerified | boolean      | false         | ✔       |        |                                                           |
| deletedAt     | Date         |               |          |        |                                                           |

## Customer Credential

| KEY NAME | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION        |
| -------- | ---------- | ------------- | -------- | ------ | ------------------ |
| customer | ObjectId   |               | ✔       |        |                    |
| password | hash       |               | ✔       |        | Password criteria: |

- min 6 characters
- symbols
- numbers
- alphabet |
  | createdAt | Date | current time |  |  |  |
  | updatedAt | Date | current time |  |  |  |

## Coach Credential

| KEY NAME | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION        |
| -------- | ---------- | ------------- | -------- | ------ | ------------------ |
| coach    | ObjectId   |               | ✔       |        |                    |
| password | hash       |               | ✔       |        | Password criteria: |

- min 6 characters
- symbols
- numbers
- alphabet |
  | createdAt | Date | current time |  |  |  |
  | updatedAt | Date | current time |  |  |  |

## Verification

| KEY NAME  | VALUE TYPE | DEFAULT VALUE                  | REQUIRED               | UNIQUE  | DESCRIPTION |
| --------- | ---------- | ------------------------------ | ---------------------- | ------- | ----------- |
| ID        | ObjectId   |                                | ✔                     | ✔      |             |
| code      | uuid       |                                | ✔                     | ✔      |             |
| customer  | ObjectId   |                                | ✔ if coach is null    |         |             |
| coach     | ObjectId   |                                | ✔ if customer is null |         |             |
| phone     | string     |                                | ✔ if email is null    |         |             |
| email     | string     |                                | ✔ if phone is null    |         |             |
| expiredAt | Date       | current time + expiration time | ✔                     |         |             |
| createdAt | Date       | current time                   |                        |         |             |
| status    | pending    | verified                       | expired                | pending | ✔          |

## Coach

| KEY NAME          | VALUE TYPE         | DEFAULT VALUE | REQUIRED   | UNIQUE | DESCRIPTION                                               |
| ----------------- | ------------------ | ------------- | ---------- | ------ | --------------------------------------------------------- |
| ID                | ObjectId           |               | ✔         | ✔     |                                                           |
| firstName         | string             |               | ✔         |        |                                                           |
| lastName          | string             |               | ✔         |        |                                                           |
| activitiesAddress | Address            |               |            |        |                                                           |
| picture           | URL                |               |            |        |                                                           |
| email             | string             |               | ✔         | ✔     | should be unique in both customers and coaches collection |
| createdAt         | Date               | current time  |            |        |                                                           |
| updatedAt         | Date               | current time  |            |        |                                                           |
| status            | signed-up          | rejected      | incomplete | active | deleted                                                   |
| blocked           | boolean            | false         | ✔         |        |                                                           |
| emailVerified     | boolean            | false         | ✔         |        |                                                           |
| phone             | string             |               |            |        |                                                           |
| phoneVerified     | boolean            | false         | ✔         |        |                                                           |
| bio               | string             |               |            |        | at least 100 characters                                   |
| languages         | string[]           | []            |            |        |                                                           |
| sport             | ObjectId           |               |            |        | category ID                                               |
| sessionTypes      | ObjectId[]         |               |            |        | sub category ID                                           |
| expertiseLevel    | enum [QUESTION 25] |               |            |        |                                                           |
| yearsExperience   | number more than 0 |               |            |        |                                                           |
| areasOfSpecialism | string             |               |            |        |                                                           |
| address           | Address            |               |            |        |                                                           |
| promoted          | boolean            | false         | ✔         |        |                                                           |
| deletedAt         | Date               |               |            |        |                                                           |
| plan              | ObjectId           |               |            |        | relation to CoachPlan                                     |

<aside>
✅ **QUESTION 25:** What are the different levels of coach expertise?
**ANSWER:** 1. beginner 2. intermediate 3. advanced 4. elite

</aside>

## Coach Certificate

| KEY NAME    | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| ----------- | ---------- | ------------- | -------- | ------ | ----------- |
| ID          | ObjectId   |               | ✔       | ✔     |             |
| createdAt   | Date       | current time  |          |        |             |
| updatedAt   | Date       | current time  |          |        |             |
| title       | string     |               | ✔       |        |             |
| description | string     |               | ✔       |        |             |
| expiryDate  | Date       |               | ✔       |        |             |
| document    | URL        |               | ✔       |        |             |
| status      | active     | deleted       | active   | ✔     |             |
| coach       | ObjectId   |               | ✔       |        |             |
| deletedAt   | Date       |               |          |        |             |

## Sport

| KEY NAME    | VALUE TYPE                  | DEFAULT VALUE   | REQUIRED    | UNIQUE  | DESCRIPTION                       |
| ----------- | --------------------------- | --------------- | ----------- | ------- | --------------------------------- |
| ID          | ObjectId                    |                 | ✔          | ✔      |                                   |
| title       | string                      |                 | ✔          |         |                                   |
| description | string (max 100 characters) |                 |             |         |                                   |
| cover       | URL                         |                 |             |         |                                   |
| icon        | URL                         |                 | ✔          |         |                                   |
| status      | active                      | inactive        | coming-soon | deleted | active                            |
| createdAt   | Date                        | current time    |             |         |                                   |
| updatedAt   | Date                        | current time    |             |         |                                   |
| slug        | string                      | slugified title | ✔          | ✔      | generated by slugifying the title |
| sessions    | ObjectId[]                  |                 | ✔          |         | length==3 or length==6            |
| offers      | Offer[]                     | []              | ✔          |         | length==0 , 3 or 6                |
| deletedAt   | Date                        |                 |             |         |                                   |

## Offer

| KEY NAME    | VALUE TYPE             | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| ----------- | ---------------------- | ------------- | -------- | ------ | ----------- |
| title       | string                 |               | ✔       |        |             |
| description | string (max 100 chars) |               | ✔       |        |             |
| photo       | URL                    |               | ✔       |        |             |
| link        | URL                    |               | ✔       |        |             |
| publishedAt | Date                   | current time  |          |        |             |

## Session

| KEY NAME    | VALUE TYPE                  | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| ----------- | --------------------------- | ------------- | -------- | ------ | ----------- |
| ID          | ObjectId                    |               | ✔       | ✔     |             |
| createdAt   | Date                        | current time  |          |        |             |
| updatedAt   | Date                        | current time  |          |        |             |
| title       | string                      |               | ✔       |        |             |
| description | string (max 100 characters) |               |          |        |             |
| photo       | URL                         |               |          |        |             |
| status      | active                      | deleted       | active   | ✔     |             |
| sport       | ObjectId                    |               | ✔       |        |             |
| deletedAt   | Date                        |               |          |        |             |

## Booking

| KEY NAME       | VALUE TYPE    | DEFAULT VALUE | REQUIRED | UNIQUE          | DESCRIPTION                                                                           |
| -------------- | ------------- | ------------- | -------- | --------------- | ------------------------------------------------------------------------------------- |
| ID             | ObjectId      |               | ✔       | ✔              |                                                                                       |
| coach          | ObjectId      |               | ✔       |                 |                                                                                       |
| customer       | ObjectId      |               | ✔       |                 |                                                                                       |
| sport          | ObjectId      |               | ✔       |                 |                                                                                       |
| session        | ObjectId      |               | ✔       |                 |                                                                                       |
| location       | Address       |               | ✔       |                 |                                                                                       |
| startDate      | Date          |               | ✔       |                 | must be after current date                                                            |
| endDate        | Date          |               | ✔       |                 | must be after startDate                                                               |
| hourlyRate     | Number        |               | ✔       |                 |                                                                                       |
| totalCost      | Number        |               | ✔       |                 | hourlyRate * hours of service                                                         |
| discount       | ObjectId      |               |          |                 |                                                                                       |
| discountAmount | Number        | 0             |          |                 |                                                                                       |
| amountPayable  | Number        |               | ✔       |                 | totalCost-discount                                                                    |
| status         | not-paid      | paid          | refunded | payment-expired | canceled                                                                              |
| reference      | unique string |               | ✔       | ✔              | numeric                                                                               |
| createdAt      | Date          | current time  |          |                 |                                                                                       |
| updatedAt      | Date          | current time  |          |                 |                                                                                       |
| deletedAt      | Date          |               |          |                 |                                                                                       |
| currency       | GBP           |               |          |                 | in this version there is no other currency supported. This key added for data clarity |

## Feedback

| KEY NAME        | VALUE TYPE                                | DEFAULT VALUE | REQUIRED  | UNIQUE | DESCRIPTION                              |
| --------------- | ----------------------------------------- | ------------- | --------- | ------ | ---------------------------------------- |
| ID              | ObjectId                                  |               | ✔        | ✔     |                                          |
| createdAt       | Date                                      | current time  |           |        |                                          |
| updatedAt       | Date                                      | current time  |           |        |                                          |
| score           | Number between 1 to 5 (including 1 and 5) |               | ✔        |        |                                          |
| review          | string                                    |               | ✔        |        |                                          |
| booking         | ObjectId                                  |               | ✔        |        |                                          |
| coach           | ObjectId                                  |               | ✔        |        |                                          |
| customer        | ObjectId                                  |               | ✔        |        |                                          |
| reviewerType    | customer                                  | coach         | coach     | ✔     |                                          |
| status          | published                                 | deleted       | published | ✔     |                                          |
| deletedAt       | Date                                      |               |           |        |                                          |
| helpedCustomers | ObjectId[]                                |               | ✔        |        | Customers who pressed the helpful button |

## Coach Available Times

| KEY NAME           | VALUE TYPE  | DEFAULT VALUE | REQUIRED  | UNIQUE   | DESCRIPTION                                                                           |
| ------------------ | ----------- | ------------- | --------- | -------- | ------------------------------------------------------------------------------------- |
| ID                 | ObjectId    |               | ✔        | ✔       |                                                                                       |
| coach              | ObjectId    |               | ✔        |          |                                                                                       |
| weekday            | Monday      | Tuesday       | Wednesday | Thursday | Friday                                                                                |
| startTimeInMinutes | Number      |               |           |          | start time, converted in minutes. Example: 8:30 AM would be 510                       |
| endTimeInMinutes   | Number      |               |           |          | end time, converted in minutes. Example: 8:30 AM would be 1125                        |
| hourlyRate         | Number ≥ 0 |               | ✔        |          |                                                                                       |
| rateCurrency       | GBP         |               |           |          | in this version there is no other currency supported. This key added for data clarity |
| createdAt          | Date        | current time  |           |          |                                                                                       |
| updatedAt          | Date        | current time  |           |          |                                                                                       |

## Notification

| KEY NAME     | VALUE TYPE | DEFAULT VALUE | REQUIRED                                                  | UNIQUE           | DESCRIPTION |
| ------------ | ---------- | ------------- | --------------------------------------------------------- | ---------------- | ----------- |
| ID           | ObjectId   |               | ✔                                                        | ✔               |             |
| createdAt    | Date       | current time  |                                                           |                  |             |
| updatedAt    | Date       | current time  |                                                           |                  |             |
| title        | string     |               | ✔                                                        |                  |             |
| description  | string     |               |                                                           |                  |             |
| coach        | ObjectId   |               | at least one of coach , customer or admin must have value |                  |             |
| customer     | ObjectId   |               | at least one of coach , customer or admin must have value |                  |             |
| admin        | ObjectId   |               | at least one of coach , customer or admin must have value |                  |             |
| read         | Boolean    | false         | ✔                                                        |                  |             |
| status       | sent       | deleted       | sent                                                      | ✔               |             |
| deletedAt    | Date       |               |                                                           |                  |             |
| booking      | ObjectId   |               |                                                           |                  |             |
| receiverType | customer   | coach         | admin                                                     |                  | ✔          |
| type         | sign-up    | new-booking   | booking-canceled                                          | booking-reminder | custom      |

## Icon

| KEY NAME  | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| --------- | ---------- | ------------- | -------- | ------ | ----------- |
| ID        | ObjectId   |               | ✔       | ✔     |             |
| createdAt | Date       | current time  |          |        |             |
| updatedAt | Date       | current time  |          |        |             |
| file      | URL        |               | ✔       |        |             |
| title     | string     |               | ✔       | ✔     |             |

## Coach Plan

| KEY NAME      | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION                                                                           |
| ------------- | ---------- | ------------- | -------- | ------ | ------------------------------------------------------------------------------------- |
| ID            | ObjectId   |               | ✔       | ✔     |                                                                                       |
| createdAt     | Date       | current time  |          |        |                                                                                       |
| updatedAt     | Date       | current time  |          |        |                                                                                       |
| title         | String     |               | ✔       | ✔     |                                                                                       |
| cost          | Number     |               | ✔       |        |                                                                                       |
| currency      | GBP        | GBP           | ✔       |        | in this version there is no other currency supported. This key added for data clarity |
| promotionCost | Number     |               | ✔       |        |                                                                                       |
| BillingPeriod | monthly    | yearly        |          | ✔     |                                                                                       |

## Address (Type)

| KEY NAME        | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| --------------- | ---------- | ------------- | -------- | ------ | ----------- |
| coordinates.lat | number     |               | ✔       |        |             |
| coordinates.lng | number     |               | ✔       |        |             |
| addressLine1    | string     |               | ✔       |        |             |
| addressLine2    | string     |               | ✔       |        |             |
| city            | string     |               | ✔       |        |             |
| country         | string     |               | ✔       |        |             |
| zipCode         | string     |               | ✔       |        |             |
| placeId         | string     |               | ✔       |        |             |
| phone           | string     |               |          |        |             |
