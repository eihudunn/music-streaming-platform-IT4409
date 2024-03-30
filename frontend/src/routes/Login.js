import { Icon } from '@iconify-icon/react'

const LoginComponent = () => {
    return (
    <div className = "w-full h-full flex flex-col items-center">
        <div className="logo p-7 bg-black flex w-full" >
            <Icon icon="logos:spotify" width={117} />
        </div>
    </div>
    )
}

export default LoginComponent;