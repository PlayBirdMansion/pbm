import React, { Component } from 'react'
import Web3 from 'web3'
import Abi from '../abis/PlayBirdMansion.json'
import { AbiItem } from 'web3-utils'

declare let window: any;

export class MintApp extends Component<any, any> {
  amountOfBirds: any;
  referralAddress: any;

  async componentDidMount() {
    await this.loadBlockChainData()
    await this.checkReferralStatus()
    await this.loadTokenData()
    window.ethereum.on('accountsChanged', (accounts) => {
      let currentAccount = this.state.account
      if (accounts.length === 0) {
        window.alert("Please connect to MetaMask")
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0]
        this.setState({ account: currentAccount })
      }
      window.location.reload()
    })
    window.ethereum.on('chainChanged', (chainId) => {
      if (chainId === '0x89') {
        this.setState({ connection: true })
      }
      window.location.reload()
    })
    window.ethereum.on('disconnect', (error) => {
      window.ethereum.request({ method: 'eth_requestAccounts' })
    })
  }

  async loadBlockChainData() {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      if (typeof accounts[0] !== 'undefined') {
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({ account: accounts[0], balance: balance, web3: web3 })
      } else {
        window.alert('Please connect your MetaMask account')
      }
      try {
        const token = new web3.eth.Contract(Abi.abi as AbiItem[], Abi.networks[netId].address)
        this.setState({ token: token })
        this.setState({ connection: true })
        await this.loadTokenData()
      } catch (e) {
        console.log('Error', e)
        window.alert('Please connect MetaMask to Polygon Network')
      }
    } else {
      window.alert('Please install MetaMask')
    }
  }

  async mintBirds(numberOfBirds, amount) {
    if (this.state.token !== 'undefined') {
      try {
        await this.state.token.methods.mintBird(numberOfBirds).send({ value: amount, from: this.state.account })
        window.location.reload()
      } catch (e) {
        console.log('Error, mintBird: ', e)
      }
    }
  }

  async mintBirdsWithReferral(numberOfBirds, amount, referralAddress) {
    if (this.state.token !== 'undefined') {
      try {
        await this.state.token.methods.mintBirdWithReferral(numberOfBirds, referralAddress).send({ value: amount, from: this.state.account })
        window.location.reload()
      } catch (e) {
        console.log('Error, mintBirdWithReferral: ', e)
      }
    }
  }

  async loadTokenData() {
    if (this.state.token !== null) {
      let tokens = await this.state.token.methods.totalSupply().call()
      let tokensLeft = 6969 - tokens
      this.setState({ tokensLeft: tokensLeft })
    }
  }

  async checkReferralStatus() {
    let result = false
    if (this.state.token !== null) {
      if (this.state.account !== '') {
        result = await this.state.token.methods.alreadyReferred(this.state.account).call()
        this.setState({ referStatus: result })
      }
    }
    return result
  }

  async connectWeb3(e) {
    e.preventDefault()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0];
    this.setState({ account: account })
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      balance: 0,
      referralAddress: {
        value: ''
      },
      tokensLeft: 0,
      connection: false
    }
  }

  render() {
    return (
      <>
        <div className='content mr-auto ml-auto text-[#dfdfdf]'>
          <div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              let amount = this.amountOfBirds;
              let total = amount * 20; // convert to wei

              if (this.referralAddress !== null && this.referralAddress.value !== '') {
                if (this.referralAddress.value === this.state.account) {
                  window.alert('Cannot refer self')
                } else if (this.referralAddress.value === '0x0000000000000000000000000000000000000000') {
                  window.alert('Cannot be zero address')
                } else {
                  try {
                    let result = await this.state.token.methods.referrableAddress(this.referralAddress.value).call();
                    let resultTwo = await this.state.token.methods.balanceOf(this.referralAddress.value).call();
                    if (result === true || resultTwo > 0) {
                      total = total - (amount * 2);
                      total = total * (10 ** 18);
                      this.mintBirdsWithReferral(amount, total, this.referralAddress.value);
                    } else {
                      window.alert('Invalid Referral Address');
                    }
                  } catch (e) {
                    console.error('Error: likely invalid referral address: ', e);
                  }
                }
                this.referralAddress.value = '';
              } else {
                total = total * (10 ** 18);
                this.mintBirds(amount, total);
              }
            }}>
              <div className='flex flex-col'>
                <input
                  id='numBirds'
                  step='1'
                  type='number'
                  max='20'
                  min='0'
                  className='flex-row bg-[#4e4e4e] rounded-lg px-8 py-3 text-center my-2'
                  placeholder='Quantity'
                  ref={input => this.amountOfBirds = input}
                />

                {this.state.referStatus ? '' :
                  <input
                    id='referral'
                    max='42'
                    min='42'
                    className='flex-row bg-[#4e4e4e] rounded-lg px-8 py-3 text-center mb-2 placeholder-text-[.5rem]'
                    placeholder='(Optional) Referral Address'
                    ref={input => this.referralAddress = input}
                  />
                }
              </div>
              <button type='submit' className='shadow py-2 px-16 text-white text-[1.5rem] rounded-xl bg-gradient-to-tr from-[#C171DD] to-[#9D9BFF] my-2'>MINT</button>
            </form>
          </div>
          <div className='py-2 font-semibold text-[1.15rem] leading-none mt-3'>
            Price: 30 MATIC / Bird
          </div>
          <div className='leading-none py-2 font-extralight text-[.75rem]'>
            Max: 20 Birds per Transaction
          </div>
          <div className='py-2 text-[.85rem] mb-2'>
            Use a referral address for a 4 MATIC discount!
          </div>
          <div className='py-2'>
            {this.state.account !== '' ? null : <button type='submit' className='py-2 px-16 text-white text-[1.5rem] rounded-xl bg-gradient-to-tr from-[#C171DD] to-[#9D9BFF] my-2' onClick={(e) => this.state.connectWeb3(e)}>Connect Web3</button>}
            <div className='text-[.75rem]'>Account:<br /> {this.state.account}</div>
            {this.state.connection ? null : <h3>Please connect MetaMask to Polygon Network</h3>}
            {this.state.tokensLeft !== 0 ? <h3 className='mt-4'>{(this.state.tokensLeft).toString()}/6969 Birds Remaining</h3> : null}
          </div>
        </div>
      </>
    );
  }
}
// interface MintAppProps {
// }

// declare let window: any;

// // original app v1
// export const MintApp: React.FC<MintAppProps> = ({ }) => {
//   const [web3, setWeb3] = useState('undefined' as any);
//   const [account, setAccount] = useState('');
//   const [token, setToken] = useState(null);
//   const [balance, setBalance] = useState(0 as any);
//   const [referralAddress, setReferralAddress] = useState({ value: '' });
//   const [referStatus, setReferStatus] = useState(false);
//   const [tokensLeft, setTokensLeft] = useState(0);
//   const [connection, setConnection] = useState(false);

//   const loadBlockChainData = async () => {
//     if (typeof window.ethereum !== 'undefined') {
//       const web3 = new Web3(window.ethereum);
//       const netId = await web3.eth.net.getId();
//       const accounts = await web3.eth.getAccounts();

//       if (typeof accounts[0] !== 'undefined') {
//         const balance = await web3.eth.getBalance(accounts[0]);
//         setAccount(accounts[0]);
//         setBalance(balance);
//         setWeb3(web3);
//       } else {
//         window.alert('Please connect your MetaMask account');
//       }

//       try {
//         const token = new web3.eth.Contract(Abi.abi as AbiItem[], Abi.networks[netId].address);
//         setToken(token);
//         setConnection(true);
//         await loadTokenData();
//       } catch (e) {
//         console.error('Error', e);
//       }

//     } else {
//       window.alert('Please install MetaMask');
//     }
//   }

//   const loadTokenData = async () => {
//     if (token !== null) {
//       let tokens = await token.methods.totalSupply().call();
//       let tokensLeft = 6969 - tokens;
//       setTokensLeft(tokensLeft);
//     }
//   }

//   const checkReferralStatus = async () => {
//     let result = false
//     if (token !== null) {
//       if (account !== '') {
//         result = await token.methods.alreadyReferred(account).call()
//         setReferStatus(result);
//       }
//     }
//     return result;
//   }

//   const mintBirds = async (numberOfBirds, amount) => {
//     if (token !== 'undefined') {
//       try {
//         await token.methods.mintBird(numberOfBirds).send({ value: amount, from: account });
//       } catch (e) {
//         console.error('Error, mintBird: ', e);
//       }
//     }
//   }

//   const mintBirdsWithReferral = async (numberOfBirds, amount, referralAddress) => {
//     if (token !== 'undefined') {
//       try {
//         await token.methods.mintBirdWithReferral(numberOfBirds, referralAddress).send({ value: amount, from: account });
//         window.location.reload();
//       }
//       catch (e) {
//         console.error('Error, mintBirdWithReferral: ', e);
//       }
//     }
//   }

//   const connectWeb3 = async (e) => {
//     e.preventDefault();
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const account = accounts[0];
//     setAccount(account);
//   }

//   const amountOfBirds = useRef({ value: 0 }) as any;

//   React.useEffect(() => {
//     const mount = async () => {
//       await loadBlockChainData();
//       await checkReferralStatus();
//       await loadTokenData();
//       window.ethereum.on('accountsChanged', (accounts) => {
//         let currentAccount = account;
//         if (accounts.length === 0) {
//           window.alert('Please connect to MetaMask');
//         } else if (accounts[0] !== currentAccount) {
//           currentAccount = accounts[0];
//           setAccount(currentAccount);
//         }
//         window.location.reload();
//       })
//       window.ethereum.on('chainChanged', (chainId) => {
//         if (chainId === '0x89') {
//           setConnection(true);
//         }
//         window.location.reload();
//       })
//       window.ethereum.on('disconnect', (error) => {
//         window.ethereum.request({ method: 'eth_requestAccounts' });
//       })
//     }
//     mount();
//   }, [account, checkReferralStatus(), loadBlockChainData(), loadTokenData()]);

//   return (
//     <>
//       <div className='content mr-auto ml-auto text-[#dfdfdf]'>
//         <div>
//           <form onSubmit={async (e) => {
//             e.preventDefault();
//             let amount = amountOfBirds.current.value;
//             let total = amount * 20; // convert to wei

//             if (referralAddress !== null && referralAddress.value !== '') {
//               if (referralAddress.value === account) {
//                 window.alert('Cannot refer self')
//               } else if (referralAddress.value === '0x0000000000000000000000000000000000000000') {
//                 window.alert('Cannot be zero address')
//               } else {
//                 try {
//                   let result = await token.methods.referrableAddress(referralAddress.value).call();
//                   let resultTwo = await token.methods.balanceOf(referralAddress.value).call();
//                   if (result === true || resultTwo > 0) {
//                     total = total - (amount * 2);
//                     total = total * (10 ** 18);
//                     mintBirdsWithReferral(amount, total, referralAddress.value);
//                   } else {
//                     window.alert('Invalid Referral Address');
//                   }
//                 } catch (e) {
//                   console.error('Error: likely invalid referral address: ', e);
//                 }
//               }
//               referralAddress.value = '';
//             } else {
//               total = total * (10 ** 18);
//               mintBirds(amount, total);
//             }
//           }}>
//             <div className='flex flex-col'>
//               <input
//                 id='numBirds'
//                 step='1'
//                 type='number'
//                 max='20'
//                 className='flex-row bg-[#4e4e4e] rounded-lg px-8 py-3 text-center my-2'
//                 placeholder='Quantity'
//                 ref={amountOfBirds}
//               />

//               {referStatus ? '' :
//                 <input
//                   id='referral'
//                   max='42'
//                   min='42'
//                   className='flex-row bg-[#4e4e4e] rounded-lg px-8 py-3 text-center mb-2 placeholder-text-[.5rem]'
//                   placeholder='(Optional) Referral Address'
//                   ref={(input) => { setReferralAddress(input) }}
//                 />
//               }
//             </div>
//             <button type='submit' className='shadow py-2 px-16 text-white text-[1.5rem] rounded-xl bg-gradient-to-tr from-[#C171DD] to-[#9D9BFF] my-2'>MINT</button>
//           </form>
//         </div>
//         <div className='py-2 font-semibold text-[1.15rem] leading-none mt-3'>
//           Price: 30 MATIC / Bird
//         </div>
//         <div className='leading-none py-2 font-extralight text-[.75rem]'>
//           Max: 20 Birds per Transaction
//         </div>
//         <div className='py-2 text-[.85rem] mb-2'>
//           Use a referral address for a 4 MATIC discount!
//         </div>
//         <div className='py-2'>
//           {account !== '' ? null : <button type='submit' className='py-2 px-16 text-white text-[1.5rem] rounded-xl bg-gradient-to-tr from-[#C171DD] to-[#9D9BFF] my-2' onClick={(e) => connectWeb3(e)}>Connect Web3</button>}
//           <div className='text-[.75rem]'>Account:<br /> {account}</div>
//           {connection ? null : <h3>Please connect MetaMask to Polygon Network</h3>}
//           {tokensLeft !== 0 ? <h3 className='mt-4'>{(tokensLeft).toString()}/6969 Birds Remaining</h3> : null}
//         </div>
//       </div>
//     </>
//   )
// }