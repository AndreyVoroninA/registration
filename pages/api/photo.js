export default function fio(req, res) {
   const {photo} = req.body
   if (photo) {
     res.status(200).json({ status: 1})
   }
   else {
     res.status(500).json({ status: 0 })
   }
 }