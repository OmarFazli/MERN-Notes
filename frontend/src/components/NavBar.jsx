import { PlusIcon , ToggleLeft, ToggleRight} from 'lucide-react'
import { Link } from 'react-router'
import React from 'react'

const NavBar = () => {
  return (
    <header className='bg-base-100 border-b border-base-content/50'>
        <div className='mx-auto max-w-6xl p-5'>
            <div className='flex items-center justify-between'>
                <h1 className='text-5xl font-extrabold text-primary'>Hello</h1>
                <div className='flex items-center gap-6'>
                    <Link to={"/create"} className='btn btn-primary'>
                        <PlusIcon className='size-7'></PlusIcon>
                        <span>Create Note</span>
                    </Link>
                    <div>
                        <button>
                            <ToggleLeft className="size-10" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default NavBar