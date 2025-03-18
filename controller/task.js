// // const express=require('express'),
// // router=express.Router()


// // //http:localhost:5000/api/task/

// // const db=require('../db')

// // router.get('/',async(req,res)=>{
  
// //    const [rows]=await db.query('SELECT * FROM tasks;')
   
// //     .catch(err => console.log(err))
// //      res.send(rows)
// // })

// // module.exports=router;

// const express = require('express');
// const router = express.Router(); // <-- Define router here
// const db = require('../db'); // Import the database connection

// // GET all tasks
// router.get('/', async (req, res) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM tasks;');
//         res.json(rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error fetching tasks' });
//     }
// });

// // GET a single task by ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);

//         if (rows.length === 0) {
//             return res.status(404).json({ error: "Task not found" });
//         }

//         res.json(rows[0]); // Return only the first matching task
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error fetching task' });
//     }
// });


// // POST a new task
// router.post('/', async (req, res) => {
//     const { taskOwner, taskName, description, startDate, dueDate, priority, status } = req.body;

//     if (!taskOwner || !taskName) {
//         return res.status(400).json({ error: "Task Owner and Task Name are required" });
//     }

//     try {
//         const sql = `INSERT INTO tasks (task_owner, task_name, description, start_date, due_date, priority, status) 
//                      VALUES (?, ?, ?, ?, ?, ?, ?)`;
//         await db.query(sql, [taskOwner, taskName, description, startDate, dueDate, priority, status]);
        
//         res.status(201).json({ message: "Task added successfully!" });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error adding task" });
//     }
// });
// // put a new task
// router.put('/:id', async (req, res) => {
//     const taskId = req.params.id;
//     const { taskOwner, taskName, description, startDate, dueDate, priority, status } = req.body;

//     try {
//         const sql = `UPDATE tasks 
//                      SET task_owner = ?, task_name = ?, description = ?, start_date = ?, due_date = ?, priority = ?, status = ? 
//                      WHERE id = ?`;
//         await db.query(sql, [taskOwner, taskName, description, startDate, dueDate, priority, status, taskId]);

//         res.json({ message: "Task updated successfully!" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error updating task" });
//     }
// });

// // DELETE a task
// router.delete('/:id', async (req, res) => {
//     const taskId = req.params.id;

//     try {
//         const sql = `DELETE FROM tasks WHERE id = ?`;
//         const [result] = await db.query(sql, [taskId]);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: "Task not found" });
//         }

//         res.json({ message: "Task deleted successfully!" });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error deleting task" });
//     }
// });


// module.exports = router; 

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tasks;');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(rows[0]); // Return only the first matching task
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching task' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const { taskOwner, taskName, description, startDate, dueDate, priority, status } = req.body;

    if (!taskOwner || !taskName) {
        return res.status(400).json({ error: "Task Owner and Task Name are required" });
    }

    try {
        const sql = `INSERT INTO tasks (task_owner, task_name, description, start_date, due_date, priority, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [taskOwner, taskName, description, startDate, dueDate, priority, status]);
        
        res.status(201).json({ message: "Task added successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding task" });
    }
});

// UPDATE a task
router.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    const { taskOwner, taskName, description, startDate, dueDate, priority, status } = req.body;

    try {
        const sql = `UPDATE tasks 
                     SET task_owner = ?, task_name = ?, description = ?, start_date = ?, due_date = ?, priority = ?, status = ? 
                     WHERE id = ?`;
        await db.query(sql, [taskOwner, taskName, description, startDate, dueDate, priority, status, taskId]);

        res.json({ message: "Task updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating task" });
    }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const sql = `DELETE FROM tasks WHERE id = ?`;
        const [result] = await db.query(sql, [taskId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting task" });
    }
});

module.exports = router;

