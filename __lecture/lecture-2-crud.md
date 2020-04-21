# 6.1.2 CRUD

---

What does it stand for?

---

**C**reate
**R**ead
**U**pdate
**D**elete

---

🤔

- What are the equivalent _express_ methods?
 <!-- 
   C-reate: POST
   R-ead: GET
   U-pdate: PUT/PATCH
   D-elete: DELETE
   -->
- What are the corresponding _http_ codes?
<!-- 
   C-reate: 201 (creation code in http is 201, 200 if success)
   R-ead: 200 or 204 (204 cant send anything back, no data)
   U-pdate: yy15
   D-elete:
 -->

---

## In MongoDB

| CRUD       | Mongo methods   |
| ---------- | --------------- |
| **C**reate | `.insertOne()`  |
|            | `.insertMany()` |
| **R**ead   | `.findOne()`    |
|            | `.find()`       |
| **U**pdate | `.updateOne()`  |
| **D**elete | `.deleteOne()`  |

---

You will learn, **hands-on**, how to use these methods in today's workshop.

---

MongoDB has stuff that makes it faster
 terminal mongod - starts a server with a port
 another terminal mongo
 