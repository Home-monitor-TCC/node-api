
import { getRepository, Index } from "typeorm";

import AppError from "../errors/AppError";
import Board from "../infra/typeorm/entities/Board";
import Component from "../infra/typeorm/entities/Component";;
import Led from "../infra/typeorm/entities/Led";
import TemperatureSensor from "../infra/typeorm/entities/TemperatureSensor";
import TemperatureData from "../infra/typeorm/entities/TemperatureData";

interface IRequest {
    mac_address: string,
}

interface IResponse {
        id: string, 
        name: string,
        description: string,
        pin: number,
        type: number
        data: ILed | ISensor
}

interface ILed {
    state: boolean
}

interface ISensor {
    temperature: number | undefined,
    date: Date | undefined
}

class DatabaseDumpService{
  public async execute({ mac_address }: IRequest): Promise<IResponse[]> {
    const boardRepository = getRepository(Board);
    const ledRepository = getRepository(Led);
    const tempDataRepository = getRepository(TemperatureData);
    const componentRepository = getRepository(Component);
    const tempSensorRepository = getRepository(TemperatureSensor);
    const arrLeds:string[] = [];
    const arrSensor:string[] = [];
    
    const checkBoard = await boardRepository.findOne({
      where: {
        mac_address,
      },
    });

    if (!checkBoard) {
      throw new AppError("Hardware não encontrado");
    }
    
    
    const components = await componentRepository.find({
        where:{
            board_id:mac_address,
        },
    });
    
    components.forEach(e => {
        if(e.type===1){
            arrLeds.push(e.id);
        }   
        else if(e.type===2){
            arrSensor.push(e.id);
        }   
        else throw new AppError("Erro ao buscar os dados");  
    });

    const leds = await ledRepository.findByIds(arrLeds);
    const sensors = await tempSensorRepository.findByIds(arrSensor);
    const arrResponse:IResponse[] = [];
    
    components.forEach(async e =>{
        if(e.type===1){
            const data = { } as ILed;
            for(let i = 0; i < leds.length; i++){
                if (leds[i].id === e.id) {
                    data.state = leds[i].state;
                }    
            }
            let aux:IResponse  = {
                id: e.id,
                name : e.name,
                description :  e.description,
                pin : e.pin,
                type : e.type,
                data,
            };            
            arrResponse.push(aux);
        }
        else if(e.type===2){
            const data = { } as ISensor;

            for(let i = 0; i < sensors.length; i++){
                if (sensors[i].id === e.id) {
                    const temp =  await tempDataRepository.findOne({
                        where:{
                            id : e.id,
                        },
                        order:{
                            temperature:"DESC", 
                        }
                    });
                    if (temp) {
                        data.temperature = temp.temperature;
                        data.date = temp.created_at;
                    }
                    else{
                        data.temperature = undefined;
                        data.date = undefined;
                    }
                }    
            }
            let aux:IResponse  = {
                id: e.id,
                name : e.name,
                description : e.description,
                pin : e.pin,
                type : e.type,
                data,
            };
            arrResponse.push(aux);
        }
    });
    return arrResponse;
  }
}

export default DatabaseDumpService;