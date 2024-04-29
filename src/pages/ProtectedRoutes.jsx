import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const trainerName = useSelector((store) => store.trainerName)

    const navigate = useNavigate()

    if (trainerName.length > 2) {
      return <Outlet></Outlet>
    } else {
      return <Navigate to= "/"></Navigate>
    }
}

export default ProtectedRoutes
