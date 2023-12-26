
import Intern from "../models/intenShipModel.js";


export const getAllIntern = async (req, res, next) =>{

    try{
     
       const allintern =await Intern.find({})

       res.status(200).json({
        status:'success',
        data: allintern
       })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })


    }
}

//post intern
export const postIntern = async (req, res, next)=>{
  try{
    
    const response = await Intern.create(req.body)
   if(res.lemgth === 0){

    res.status(401).json({
        status:'not found'
        
    })
   }
    res.status(201).json({
        status:'created successfully',
        data: response
    })

  }catch(err){
     res.status(401).json({
        status:'failed to create',
        message:err.message
     })


  }

}

//get intern by id

export const getInternById= async (req, res, next) =>{
 const {id} = req.params;

    try{
    const response = await Intern.findOne({_id: id})
    res.status(200).json({
        status:'success',
        response
    })

    } catch(err){

      res.status(400).json({
        status:'failed',
        message:err.message
      })
    }
}