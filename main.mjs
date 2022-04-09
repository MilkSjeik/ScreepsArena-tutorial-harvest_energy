import { getObjectsByPrototype, findClosestByPath } from '/game/utils';
import { StructureSpawn, Creep, Source} from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE} from '/game/constants';
import { } from '/arena';

export function loop() {
    const spawn = getObjectsByPrototype(StructureSpawn).find(struct => struct.my);
    const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    const sources =  getObjectsByPrototype(Source);

    myCreeps.forEach(myCreep => {
        if(myCreep.store.getFreeCapacity(RESOURCE_ENERGY)){
            // find closest source
            const source = findClosestByPath(myCreep, sources);
            if(myCreep.harvest(source) == ERR_NOT_IN_RANGE){
                myCreep.moveTo(source);
            }
        } else {
            if(myCreep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                myCreep.moveTo(spawn);
            }
        }
    });
}
