const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
	db("accounts")
		.then((posts) => res.status(200).json(posts))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

router.get("/:id", (req, res) => {
	db("accounts")
		.where({ id: req.params.id })
		.first()
		.then((post) => res.status(200).json(post))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

router.post("/", (req, res) => {
	if (req.body.name && req.body.budget) {
		db("accounts")
			.insert(req.body)
			.then((ids) => {
				db("accounts")
					.where({ id: ids[0] })
					.first()
					.then((post) => res.status(201).json(post));
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err.message });
			});
	} else {
		res.status(400).json({ message: "Account must include name and budget" });
	}
});

router.put("/:id", (req, res) => {
	const { id } = req.params;

	db("accounts")
		.where({ id })
		.update(req.body)
		.then(() => {
			db("accounts")
				.where({ id })
				.first()
				.then((post) => res.status(200).json(post));
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

router.delete("/:id", (req, res) => {
	db("accounts")
		.where({ id: req.params.id })
		.del()
		.then((count) => res.status(200).json(count))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

module.exports = router;
