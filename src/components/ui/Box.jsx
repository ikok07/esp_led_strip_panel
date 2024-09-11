export default function Box({Icon, label, children}) {
    return <div className="flex items-center gap-4">
        <Icon />
        <label className="text-2xl font-semibold " >{label}: </label>
        {children}
    </div>
}