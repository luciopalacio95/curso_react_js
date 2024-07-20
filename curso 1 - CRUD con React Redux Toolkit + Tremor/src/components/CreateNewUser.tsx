import {Badge, Button, Card, TextInput, Title } from "@tremor/react"
import { useState, useEffect } from "react"
import {useUserActions} from "../hooks/useUserActions"
import { toast } from "sonner"


export default function CreateNewUser(props) {
    const {addUser, editUser} = useUserActions()
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

        if(props.isEdit === "true") {
            const idUser = props.userEdit.id;
            editUser({id:idUser, name, email, github})
            toast.success(`Usuario ${name} modificado correctamente`)
            props.setIsEdit("false")
            props.setUserEdit([])
            setResult('ok')
            form.reset()    
        }else{
            addUser({name, email, github})
            toast.success(`Usuario ${name} creado correctamente`)
            setResult('ok')
            form.reset()    
        }
    }

    const handleCancel = () => {
        props.setIsEdit("false")
        props.setUserEdit([])
    }
    useEffect(() => {
        if(props.isEdit === "true"){
            document.querySelector('input[name="name"]').value = props.userEdit.name;
            document.querySelector('input[name="email"]').value = props.userEdit.email;
            document.querySelector('input[name="github"]').value = props.userEdit.github;
        }else{
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('input[name="email"]').value = '';
            document.querySelector('input[name="github"]').value = '';
        }
      }, [props.isEdit]);


    return (
		<Card className="mt-5">
            <Title>Crear nuevo usuario</Title>
            <form onSubmit={handleSubmit} id="formulario" className="">
				<TextInput className="mb-2" name="name" placeholder="Aquí el nombre"/>
				<TextInput className="mb-2" name="email" placeholder="Aquí el email" />
				<TextInput name="github" placeholder="Aquí el usuario de GitHub" />

				<div>
					<Button type="submit" className="mt-3">
                    {props.isEdit === "false"  ? 'Crear usuario' : 'Editar usuario'}
					</Button> 
                    {props.isEdit === "true"  &&
                        <Button type="button" onClick={handleCancel} variant="secondary" className="ml-3 mt-3">
                        Cancelar
                        </Button>
                    }                
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