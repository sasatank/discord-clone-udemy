import React,{useState,useEffect} from 'react';

import {collection, query, onSnapshot, QuerySnapshot, DocumentData, CollectionReference, Query } from "firebase/firestore";
import { db } from '../firebase';


interface Channels{
  id : string,
  channel: DocumentData;
}

const useCollection = (data: string) => {
  
  const [documents,setDocuments] = useState<Channels[]>([]);
  const collectionRef: Query<DocumentData>  = query(collection(db,data));

  useEffect(() => {
    
  
      onSnapshot(collectionRef,(QuerySnapshot) =>{
        const channelsResults: Channels[] = [];
        QuerySnapshot.docs.forEach((doc) => 
        channelsResults.push({
          // console.log(doc.id,doc.data())
            id: doc.id,
            channel: doc.data(),
        })
        );
        setDocuments(channelsResults);
      });
      
    },[]);

    return {documents};
  
}

export default useCollection;