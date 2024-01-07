const Unit = require("../Model/Unit");

exports.UnitCreate = async (req, res, next) => {
    try {
        const { name, unit_code } = req.body;
        const exists = await Unit.exists({ $or: [{ name }, { unit_code }] });
        if (exists) {
            return res
                .status(400)
                .json({ success: false, status: 400, message: "Unit name or code already exists" });
        }
        const unit = await Unit.create({ name, unit_code });
        res.status(201).json({
            success: true,
            status: 200,
            message: "Unit created successfully",
            data: unit,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, status: 500, message: error.message });
    }
};

exports.GetUnit = async (req, res, next) => {
    try {
        const unit = await Unit.find().lean();
        res.status(200).json({
            success: true,
            status: 200,
            message: "unit fetched successfully",
            data: unit,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, status: 500, error: error.message });
    }
};

exports.UpdateUnit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, unit_code } = req.body;
        const tempObject = {};
        if (!name || !unit_code) {
            return res.status(400).json({ success: false, status: 400, message: "Please fill all the fields" })
        }

        const exists = await Unit.exists({ $or: [{ name }, { unit_code }] });
        if (exists) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Unit already exists",
            });
        }

        const unit = await Unit.findByIdAndUpdate(id, { name, unit_code }, {
            new: true,
        });
        res.status(200).json({
            success: true,
            status: 200,
            message: "Unit updated successfully",
            data: unit,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, status: 500, error: error.message });
    }
};

exports.DeleteAndRecoverUnit = async (req, res, next) => {
    try {
        const id = req.params.id;

        const unit = await Unit.findByIdAndUpdate(
            id,
            { is_deleted: req.body.is_deleted },
            { new: true }
        );
        if (!unit) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "unit not found",
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: `Unit ${unit.is_deleted ? "Delete" : "Recover"}  Successful`,
            data: unit,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            status: 500,
            error: error.message,
        });
    }
};
