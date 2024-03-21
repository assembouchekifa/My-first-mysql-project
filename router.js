import { Router } from "express";

import {
  creatMessage,
  deletMessage,
  getMessag,
  getMessags,
  updateMessage,
} from "./connectdb.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await getMessags();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await getMessag(req.params.id);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(404).json({ error: "message is required" });
    }
    const id = await creatMessage(req.body.message);
    const data = await getMessag(id);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(404).json({ error: "message is required" });
    }
    const roweffect = await updateMessage(req.params.id, req.body.message);
    if (roweffect == 0) {
      return res.status(200).json({ message: "id not exist" });
    }
    const data = await getMessag(req.params.id);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const roweffect = await deletMessage(req.params.id);
    if (roweffect == 0) {
      return res.status(200).json({ message: "id not exist" });
    }
    return res.status(200).json({ message: "deleted !!" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

export default router;
