
export default function contact(req, res) {
   const {num, email} = req.body
   if (num || email) {
     res.status(200).json({ status: 1})
   }
   else {
     res.status(500).json({ status: 0 })
   }
   
 }
 