import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import {Link} from 'components'
import {userService, alertService} from 'services'
import { route } from 'next/dist/server/router'

export {AddEdit}

function AddEdit(props){
    const user = props?.user
    const isAddMode = !user
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('O primeiro nome é obrigatório.'),
        lastName: Yup.string()
            .required('O último nome é obrigatório.'),
        username: Yup.string()
            .required('Nome de usuário é obrigatório.'),
        password: Yup.string()
            .transform(x => x === '' ? undefined: x)
            .concat (isAddMode ? Yup.string().required('A senha é obrigatória') : null)
            .min(6, 'A senha deve ter mais de 6 caracteres')

    })
    const formOptions = { resolver: yupResolver(validationSchema)}

    if(!isAddMode){
        formOptions.defaultValues = props.user;
    }

    const {register, handleSubmit, reset, formState } = useForm(formOptions)
    const {errors} = formState

    function onSubmit(data){
        return isAddMode
        ? createUser(data)
        : updateUser(user.id, data)
    }
    function createUser(data){
        return userService.register(data)
            .then(() => {
                alertService.success('User add', {keepAfterRouteChange: true})
                router.push('.')
            })
            .catch(alertService.error)
    }
    function updateUser(data){
        return userService.update(id, data)
            .then(() => {
                alertService.success('User update', {keepAfterRouteChange: true})
                router.push('..')
            })
            .catch(alertService.error)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Primeiro nome</label>
                    <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Último nome</label>
                    <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Nome de usuário</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>
                        Senha
                        {!isAddMode && <em className="ml-1">(Leave blank to keep the same password)</em>}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}