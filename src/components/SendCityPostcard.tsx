import type { City, User } from "@/lib/types";
import { Loading } from "@/icons/react/Loading";
import type { ChangeEvent } from "react";
import ShowErrorToast from "./ShowErrorToast";

function SendCityPostcard({user, users, city, country}: {user: User, users: User[], city: City, country: string}) {
    const error = new URLSearchParams(location.search).get('empty');

    const userTo = users.find(u => u.name !== user.name) as User;

    const onChangeImageFile = (e:ChangeEvent) => {
        const imageChoose = document.getElementById('imageChoose') as HTMLSpanElement;
        const image = document.getElementById('image') as HTMLImageElement;

        const file = (e.target as HTMLInputElement)?.files?.[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imageChoose.style.display = 'none';
                image.classList.remove('hidden');
                image.src = e.target?.result as string;
            }
            
            reader.readAsDataURL(file);
        }
    }
    
    onsubmit = () => {
        const loadingContainer = document.getElementById('loadingContainer') as HTMLDivElement;
        loadingContainer.classList.remove('hidden');
        loadingContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg md:px-2">
            <h2 className="text-3xl font-bold my-6 text-black uppercase text-center">Enviar Postal</h2>
            <form method="POST" action="/api/send-city-postcard" className="flex flex-col w-full gap-4 p-4">
                <span className="flex flex-row justify-center items-center w-full gap-4">
                    <label className="w-full h-auto aspect-video flex flex-col justify-center items-center text-black border border-black rounded-lg cursor-pointer hover:bg-gray-100" htmlFor="imageFile">
                        <span id="imageChoose">Elige una imagen</span>
                        <img id="image" src="" alt="" className="max-w-[300px] h-auto aspect-video rounded-lg hidden" />
                    </label>
                    <input className="p-2 rounded-md border hidden" type="file" id="imageFile" name="image" onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeImageFile(e)}/>
                </span>
                <span className="flex flex-row justify-between items-center w-full gap-4">
                    <label className="text-black" htmlFor="city">Ciudad</label>
                    <input className="p-2 rounded-md border bg-gray-100 text-gray-600" type="text" id="city" name="city" value={city.name} readOnly />
                    <input className="p-2 rounded-md border bg-gray-100 text-gray-600" type="hidden" id="country" name="country" value={country} readOnly />
                </span>
                <span className="flex flex-row justify-between items-center w-full gap-4">
                    <label className="text-black" htmlFor="userFrom">De</label>
                    <input className="p-2 rounded-md border bg-gray-100 text-gray-600" type="text" id="userFrom" name="userFrom" value={user.name} readOnly />
                </span>
                <span className="flex flex-row justify-between items-center w-full gap-4">
                    <label className="text-black" htmlFor="userTo">Para</label>
                    <input className="p-2 rounded-md border bg-gray-100 text-gray-600" type="text" id="userTo" name="userTo" value={userTo.name} readOnly />
                </span>
                <span className="flex flex-row justify-between items-center w-full gap-4">
                    <label className="text-black" htmlFor="message">Mensaje</label>
                    <textarea className="p-2 rounded-md border bg-gray-100 text-gray-600 resize-none" id="message" name="message" rows={3} placeholder="Escribe un mensaje"></textarea>
                </span>
                <span className="flex flex-col">
                    {
                        error && (
                            <span className="text-red-500 text-xs">
                                Debes rellenar todos los campos
                            </span>
                        )
                    }
                    <span className="flex flex-row justify-around">
                        <a href={`/country/${encodeURI(country)}/city/${encodeURI(city.name)}`} className="w-32 text-red-500 text-center text-xl font-semibold border border-red-500 px-2 py-1 mt-4 rounded-lg transition-all hover:text-white hover:bg-red-500 hover:scale-105">
                            Atrás
                        </a>
                        <button type="submit" className="w-32 text-black text-xl font-semibold border border-black px-2 py-1 mt-4 rounded-lg transition-all hover:text-white hover:bg-black hover:scale-105">
                            Enviar
                        </button>
                    </span>
                </span>
            </form>
            <div id="loadingContainer" className="absolute inset-0 bg-gray-500/25 rounded-lg hidden">
                <Loading className={`w-24 h-24 ${user.name === 'Alejandro' ? 'text-alejandro-primary' : ''} ${user.name === 'Gema' ? 'text-gema-primary' : ''}`} />
            </div>
            <ShowErrorToast message="Error al agregar el pais" paramError="empty" />
        </div>
    )
}

export default SendCityPostcard;