
let web: any = await WebModel.findOne({
    where: {
        code: hostname,
        timeTo: {
            [Op.gte]: now
        },
        status: {
            [Op.ne]: WEB_STATUS.BLOCKED
        }
    },
    attributes: {
        exclude: ["maintainFee", "fee", "createdAt", "updatedAt", "deletedAt"]
    },
    include: [
        {
            model: WebConfigModel,
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"]
            },
            required: true
        },
        {
            model: PageModel,
            attributes: {
                exclude: ["webId", "createdAt", "updatedAt", "deletedAt"]
            },
            include: [{
                model: ModulePageModel,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                },
                required: false,
                separate: true, 
                // This mean query will swich to 2 query here
                // ==> ModulePageModel.findWithCondition will run first 

                order: [
                    ["level", "ASC"], // sort level of ModulePageModel
                    [
                        { model: ModuleModel, as: "module" },
                        { model: StaticModel, as: "moduleStatic" },
                        "level", "ASC"
                    ] 
                    // ModuleModel -> StaticModel 
                    // sort StaticModel when ModulePageModel join=> ModuleModel join=> StaticModel
                ],
                include: [{
                    model: ModuleModel,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"]
                    },
                    required: false,
                    include: [{
                        model: StaticModel,
                        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
                    }]
                }]
            }]
        }
    ]
});