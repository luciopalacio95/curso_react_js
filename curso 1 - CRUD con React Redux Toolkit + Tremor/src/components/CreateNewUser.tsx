import {Badge, Button, Card, TextInput, Title } from "@tremor/react"
import { useState } from "react"
import {useUserActions} from "../hooks/useUserActions"
import { toast } from "sonner"


export default function CreateNewUser() {
    const {addUser} = useUserActions()
	const [result, setResult] = useState<"ok" | "ko" | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
        
        setResult(null)

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string
        
        if(!name || !email || !github) { // validaciones que tu quieras
            return setResult('ko')
        }

        addUser({name, email, github})
        toast.success(`Usuario ${name} creado correctamente`)
        setResult('ok')
        form.reset()
    }

    return (
		<Card className="mt-5">
            <Title>Crear nuevo usuario</Title>
            <form onSubmit={handleSubmit} className="">
				<TextInput className="mb-2" name="name" placeholder="Aquí el nombre"/>
				<TextInput className="mb-2" name="email" placeholder="Aquí el email" />
				<TextInput  name="github" placeholder="Aquí el usuario de GitHub" />

				<div>
					<Button type="submit" className="mt-3">
						Crear usuario
					</Button>                    
                    <br></br>                    
                    <span>
						{result === "ok" && <Badge className="mt-3" color='green'>Guardado correctamente</Badge>}
						{result === "ko" && <Badge className="mt-3" color='red'>Error con los campos</Badge>}
					</span>
				</div>
			</form>
        </Card>
    )
}