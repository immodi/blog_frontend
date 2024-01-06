import { useEffect, useRef, useState } from "react"

function useMessage() {
    const mes = useRef(null)
    const [messagesObject, setMessagesObject] = useState(null)
   
    useEffect(() => {
        if (messagesObject != null) {
            mes.current.show({
                sticky: true,
                severity: messagesObject.status,
                summary: 'Message',
                detail: messagesObject.message,
                closable: true
            })
        }
    }, [messagesObject])

    return [mes, messagesObject, setMessagesObject]
}

export default useMessage