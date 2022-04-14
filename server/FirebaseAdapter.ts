import { addDoc, collection, doc, getDocs, getDoc, Firestore, limit, query, updateDoc, where } from "firebase/firestore";
import { Account, Awaitable } from "next-auth";
import { Adapter, AdapterSession, AdapterUser, VerificationToken } from "next-auth/adapters";

export default function FirebaseAdapter(client: Firestore, options = {}):Adapter {
  return{
    createUser: function (user: Omit<AdapterUser, "id">): Awaitable<AdapterUser>{
      return new Promise<AdapterUser>(async function(reject, resolve){
        const userRef = await addDoc(collection(client, 'Users'), user);
        const userSnapshot = await getDoc(userRef);
        resolve(userSnapshot.data() as AdapterUser);
      });
    },
    getUser: function (id: string): Awaitable<AdapterUser | null> {
      return new Promise<AdapterUser | null>( async function(resolve, reject){
        const userRef = doc(client, 'Users/'+id)
        const userSnapshot = await getDoc(userRef);
        resolve(userSnapshot.data() as AdapterUser|null);
      });
    },
    getUserByEmail: function (email: string): Awaitable<AdapterUser | null> {
      return new Promise<AdapterUser | null>(async function(resolve, reject){
        const userRef = await getDocs(query(collection(client,'Users'),where('email','==',email), limit(1)));
        const userSnapshot = userRef.docs[0];
        resolve(userSnapshot.data() as AdapterUser|null);
      });
    },
    getUserByAccount: function (providerAccountId: Pick<Account, "provider" | "providerAccountId">): Awaitable<AdapterUser | null> {
      return new Promise<AdapterUser | null>(async function(resolve, reject){
        const accountRef = await getDocs(
          query(
            collection(client,'accounts'),
            where('providerAccountID','==',providerAccountId),
            limit(1)
          )
        );
        if(accountRef.empty)
          resolve(null);
        const userID = accountRef.docs[0].data().userID;
        const userRef = await getDocs(
          query(
            collection(client, 'Users'),
            where('id','==',userID),
            limit(1)
          )
        )
        const userSnapshot = userRef.docs[0];
        resolve(userSnapshot.data() as AdapterUser|null);
      });
    },
    updateUser: function (user: Partial<AdapterUser>): Awaitable<AdapterUser> {
      return new Promise<AdapterUser>(async function(resolve, reject){
        const userRef = doc(client, 'Users/'+user.id);
        await updateDoc(userRef, user);
        const newUserRef = doc(client, 'Useres/'+user.id);
        const newUserSnapshot = await getDoc(newUserRef);
        resolve(newUserSnapshot.data() as AdapterUser);
      });
    },
    linkAccount: function (account: Account): Promise<void> | Awaitable<Account | null | undefined> {
      return new Promise<Account | null | undefined>(async function(resolve, reject){
        const accountRef = await addDoc(collection(client, 'Accounts'), account);
        const accountSnapshot = await getDoc(accountRef);
        resolve(accountSnapshot.data() as Account|null|undefined);
      });
    },
    createSession: function (session: { sessionToken: string; userId: string; expires: Date; }): Awaitable<AdapterSession> {
      return new Promise<AdapterSession>(async function(resolve, reject){
        const sessionRef = await addDoc(collection(client, 'Sessions'), session);
        const sessionSnapshot = await getDoc(sessionRef);
        resolve(sessionSnapshot.data() as AdapterSession)
      });
    },
    getSessionAndUser: function (sessionToken: string): Awaitable<{ session: AdapterSession; user: AdapterUser; } | null> {
      return new Promise<{session: AdapterSession, user: AdapterUser} | null>(async function(resolve, reject){
        const sessionRef = await getDocs(
          query(
            collection(client, 'Sessions'),
            where('sessionToken','==',sessionToken),
            limit(1)
          )
        )
        const sessionSnapshot = sessionRef.docs[0];
        if(!sessionSnapshot.exists()){
          resolve(null);
        } else {
          const session = sessionSnapshot.data() as AdapterSession;
          const userRef = await getDocs(
            query(
              collection(client, 'Users'),
              where('id','==',session.userId),
              limit(1)
            )
          )
          const userSnapshot = sessionRef.docs[0];
          if(userSnapshot.exists()){
            const user = userSnapshot.data() as AdapterUser;
            resolve({
              user: user,
              session: session
            })
          } else {
            resolve(null)
          }
        }
      });
    },
    updateSession: function (session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">): Awaitable<AdapterSession | null | undefined> {
      return new Promise<AdapterSession | null | undefined>(async function(resolve, reject){
        const sessionRef = doc(client, 'Sessions/'+session.id);
        await updateDoc(sessionRef, session);
        const newSessionRef = doc(client, 'Sessions/'+session.id);
        const newSessionSnapshot = await getDoc(newSessionRef);
        resolve(newSessionSnapshot.data() as AdapterSession|null|undefined);
      });
    },
    deleteSession: function (sessionToken: string): Promise<void> | Awaitable<AdapterSession | null | undefined> {
      return new Promise<AdapterSession | null | undefined>(async function(resolve, reject){
        
      });
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////// needed for Email login ///////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createVerificationToken: function(verificationToken: VerificationToken): Awaitable<VerificationToken | null | undefined> {
      return new Promise<VerificationToken | null | undefined>(function(resolve, reject){

      });
    },
    useVerificationToken: function(params: { identifier: string; token: string;}): Awaitable<VerificationToken | null> {
      return new Promise<VerificationToken | null>(function(resolve, reject){

      });
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////// needed in later release ///////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    deleteUser: function(UserID: string): Awaitable<AdapterUser | null | undefined> {
      return new Promise<AdapterUser | null | undefined>(function(resolve, reject){

      });
    },
    unlinkAccount: function(providerAccountId: Pick<Account, "provider" | "providerAccountId">): Awaitable<Account | undefined> {
      return new Promise<Account | undefined>(function(resolve, reject){

      });
    }
  }
}
