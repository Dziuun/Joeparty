import express from "express";
import { Router } from "express";

export default function categoriesRouter(db) {
  const router = express.Router();
  router.get("/", async (req, res) => {
    try {
      console.log("working");
      const cats = await db.collection("questions").distinct("category");

      res.json(cats);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching categories");
    }
  });

  return router;
}
