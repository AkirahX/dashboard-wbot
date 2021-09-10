import Nextlink from 'next/link'

export { Link }

function Link({href, children, ...props}){
    return (
        <Nextlink href={href}>
            <a {...props}>
                {children}
            </a>
        </Nextlink>
    )
}