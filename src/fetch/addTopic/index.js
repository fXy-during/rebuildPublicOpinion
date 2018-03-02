import post from '../post';




export default function addTopic(param, token) {
    const url = '/event/specialPost/add';
    const result = post(url, param, token);
    return result;
}



