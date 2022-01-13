// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function fio(req, res) {
  const {firstName, lastName, patronymic} = req.body
  if (firstName && lastName && patronymic) {
    res.status(200).json({ status: 1})
  }
  else {
    res.status(500).json({ status: 0 })
  }
  
}

