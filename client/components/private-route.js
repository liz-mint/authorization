import React from 'react'
import Head from './head'

// только для авторизованных пользователей
const PrivateComponent = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          This is PRIVATE component
        </div>
      </div>
    </div>
  )
}

PrivateComponent.propTypes = {}

export default React.memo(PrivateComponent)
