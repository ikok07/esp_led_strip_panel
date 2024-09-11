export default function ErrorContainer({Icon, iconClass, children}) {
    return <div className="h-[100vh] grid place-content-center">
        <div className="flex flex-col items-center">
            <Icon class={`${iconClass} w-24 h-24 fill-gray-400`}/>
            <h4 className="text-4xl text-center mt-10">{children}</h4>
        </div>
    </div>
}