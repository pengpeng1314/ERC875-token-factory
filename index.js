$(() => {
    let Web3 = require("web3");
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    if (typeof window.web3 !== 'undefined')
    {
        injectedProvider = window.web3.currentProvider;
        web3 = new Web3(injectedProvider);
        console.log("injected provider used: " + injectedProvider);
    }
    else
    {
        alert("no injected provider found, using localhost:8545, please ensure your local node is running " +
            "and rpc and rpccorsdomain is enabled");
    }
    let tickets /* let of type bytes32[] here */ ;
    let nameOfContract /* let of type string here */ ;
    let symbolForContract /* let of type string here */ ;
    let organiserAddr /* let of type address here */ ;
    let paymasterAddr /* let of type address here */ ;
    let recipientAddr  /* let of type address here */ ;
    let defaultTickets = [
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7",
        "0x00000000000000000000000000000000EF6351E10000000000000000F7"
    ];

    let ticketproContract = web3.eth.contract([{
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "tickets", "type": "bytes32[]"}],
        "name": "loadNewTickets",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getContractAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "isStormBirdContract",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "expiry", "type": "uint256"}, {"name": "ticketIndices", "type": "uint16[]"}, {
            "name": "v",
            "type": "uint8"
        }, {"name": "r", "type": "bytes32"}, {"name": "s", "type": "bytes32"}],
        "name": "trade",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "bytes32[]"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getAmountTransferred",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
            "name": "ticketIndices",
            "type": "uint16[]"
        }],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "endContract",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "myBalance",
        "outputs": [{"name": "", "type": "bytes32[]"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "ticketIndices", "type": "uint16[]"}],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "expiry", "type": "uint256"}, {"name": "ticketIndices", "type": "uint16[]"}, {
            "name": "v",
            "type": "uint8"
        }, {"name": "r", "type": "bytes32"}, {"name": "s", "type": "bytes32"}, {
            "name": "recipient",
            "type": "address"
        }],
        "name": "passTo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getDecimals",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }, {
        "inputs": [{"name": "tickets", "type": "bytes32[]"}, {
            "name": "nameOfContract",
            "type": "string"
        }, {"name": "symbolForContract", "type": "string"}, {
            "name": "organiserAddr",
            "type": "address"
        }, {"name": "paymasterAddr", "type": "address"}, {"name": "recipientAddr", "type": "address"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {"payable": false, "stateMutability": "nonpayable", "type": "fallback"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_to", "type": "address"}, {
            "indexed": false,
            "name": "_indices",
            "type": "uint16[]"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
            "indexed": true,
            "name": "_to",
            "type": "address"
        }, {"indexed": false, "name": "_indices", "type": "uint16[]"}],
        "name": "TransferFrom",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "seller", "type": "address"}, {
            "indexed": false,
            "name": "ticketIndices",
            "type": "uint16[]"
        }, {"indexed": false, "name": "v", "type": "uint8"}, {
            "indexed": false,
            "name": "r",
            "type": "bytes32"
        }, {"indexed": false, "name": "s", "type": "bytes32"}],
        "name": "Trade",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "ticketIndices", "type": "uint16[]"}, {
            "indexed": false,
            "name": "v",
            "type": "uint8"
        }, {"indexed": false, "name": "r", "type": "bytes32"}, {
            "indexed": false,
            "name": "s",
            "type": "bytes32"
        }, {"indexed": true, "name": "recipient", "type": "address"}],
        "name": "PassTo",
        "type": "event"
    }]);

    function initWeb3() {
        //let's assume that coinbase is our account
        web3.eth.defaultAccount = web3.eth.coinbase;
        let address = web3.eth.defaultAccount;
        organiserAddr = $("ownerAddress").val();
        paymasterAddr = address;
        recipientAddr = $("recipientAddress").val();
        if(organiserAddr == "") organiserAddr = address;
        if(recipientAddr == "") recipientAddr = address;
        //once initialized, deploy
        deploy();
    }


    $("#deploy").click(() => {
        let eventDate = $("#eventDate").val();
        let dateTimeEvent = new Date(eventDate);
        //set all lets
        tickets = defaultTickets;
        nameOfContract = $("#eventName").val();
        symbolForContract = $("#ticketSymbol").val();
        //initialize web3 then deploy
        initWeb3();
    });

    function deploy()
    {
        $("#notice").show(); //let the user know that the contract is being deployed
        let ticketpro = ticketproContract.new(
            tickets,
            nameOfContract,
            symbolForContract,
            organiserAddr,
            paymasterAddr,
            recipientAddr,
            {
                from: web3.eth.accounts[0],
                data: '0x60806040526000600160006101000a81548161ffff021916908361ffff16021790555060006003553480156200003457600080fd5b5060405162001e0138038062001e018339810180604052810190808051820192919060200180518201929190602001805182019291906020018051906020019092919080519060200190929190805190602001909291905050508460049080519060200190620000a6929190620001a3565b508360059080519060200190620000bf929190620001a3565b5082600160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550856000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209080519060200190620001969291906200022a565b50505050505050620002d2565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001e657805160ff191683800117855562000217565b8280016001018555821562000217579182015b8281111562000216578251825591602001919060010190620001f9565b5b50905062000226919062000282565b5090565b8280548282559060005260206000209081019282156200026f579160200282015b828111156200026e5782518290600019169055916020019190600101906200024b565b5b5090506200027e9190620002aa565b5090565b620002a791905b80821115620002a357600081600090555060010162000289565b5090565b90565b620002cf91905b80821115620002cb576000816000905550600101620002b1565b5090565b90565b611b1f80620002e26000396000f3006080604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100ed5780632c8c28a71461017d578063313ce567146101e357806332a2c5d0146102145780634f452b9a1461026b578063696ecc551461029a57806370a082311461032657806372c5cb63146103be57806395d89b41146103e9578063a6fb475f14610479578063bb6e7de91461051f578063c9116b6914610536578063db0ec968146105a2578063edd5ede614610628578063f0141d84146106e1575b3480156100e757600080fd5b50600080fd5b3480156100f957600080fd5b5061010261070c565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610142578082015181840152602081019050610127565b50505050905090810190601f16801561016f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561018957600080fd5b506101e1600480360381019080803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506107ae565b005b3480156101ef57600080fd5b506101f86108d2565b604051808260ff1660ff16815260200191505060405180910390f35b34801561022057600080fd5b506102296108d7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561027757600080fd5b506102806108df565b604051808215151515815260200191505060405180910390f35b6103246004803603810190808035906020019092919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290803560ff169060200190929190803560001916906020019092919080356000191690602001909291905050506108e8565b005b34801561033257600080fd5b50610367600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c70565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156103aa57808201518184015260208101905061038f565b505050509050019250505060405180910390f35b3480156103ca57600080fd5b506103d3610d0a565b6040518082815260200191505060405180910390f35b3480156103f557600080fd5b506103fe610d14565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561043e578082015181840152602081019050610423565b50505050905090810190601f16801561046b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561048557600080fd5b5061051d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050610db6565b005b34801561052b57600080fd5b50610534611084565b005b34801561054257600080fd5b5061054b61111b565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561058e578082015181840152602081019050610573565b505050509050019250505060405180910390f35b3480156105ae57600080fd5b50610626600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506111b3565b005b34801561063457600080fd5b506106df6004803603810190808035906020019092919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290803560ff16906020019092919080356000191690602001909291908035600019169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061140d565b005b3480156106ed57600080fd5b506106f66117b2565b6040518082815260200191505060405180910390f35b606060048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107a45780601f10610779576101008083540402835291602001916107a4565b820191906000526020600020905b81548152906001019060200180831161078757829003601f168201915b5050505050905090565b6000600160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561080c57600080fd5b600090505b81518110156108ce57600080600160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020828281518110151561088857fe5b9060200190602002015190806001815401808255809150509060018203906000526020600020016000909192909190915090600019169055508080600101915050610811565b5050565b600081565b600030905090565b60006001905090565b600080600080428911806108fc5750600089145b151561090757600080fd5b610912348a8a6117bd565b9350600184888888604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af115801561098b573d6000803e3d6000fd5b505050602060405103519250600091505b8751821015610b615787828151811015156109b357fe5b9060200190602002015190506000600102600019166000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208261ffff16815481101515610a1757fe5b90600052602060002001546000191614151515610a3057fe5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208261ffff16815481101515610abd57fe5b906000526020600020015490806001815401808255809150509060018203906000526020600020016000909192909190915090600019169055506000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208161ffff16815481101515610b4657fe5b9060005260206000200160009055818060010192505061099c565b8273ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610ba7573d6000803e3d6000fd5b508273ffffffffffffffffffffffffffffffffffffffff167fec67368df72865aef2c3748b4627cbcc0b539079709e3a6fbcaea909f4c683538989898960405180806020018560ff1660ff16815260200184600019166000191681526020018360001916600019168152602001828103825286818151815260200191508051906020019060200280838360005b83811015610c4f578082015181840152602081019050610c34565b505050509050019550505050505060405180910390a2505050505050505050565b60606000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610cfe57602002820191906000526020600020905b81546000191681526020019060010190808311610ce6575b50505050509050919050565b6000600354905090565b606060058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610dac5780601f10610d8157610100808354040283529160200191610dac565b820191906000526020600020905b815481529060010190602001808311610d8f57829003601f168201915b5050505050905090565b600080600160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e1557600080fd5b600091505b8251821015610fd7578282815181101515610e3157fe5b9060200190602002015161ffff1690506000600102600019166000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481101515610e9557fe5b90600052602060002001546000191614151515610eae57fe5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481101515610f3757fe5b906000526020600020015490806001815401808255809150509060018203906000526020600020016000909192909190915090600019169055506000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481101515610fbc57fe5b90600052602060002001600090558180600101925050610e1a565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f2dc84a69caf5a654b181a8d5cbc2194f4e4cab204443797dd13dff734279ee06856040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561106a57808201518184015260208101905061104f565b505050509050019250505060405180910390a35050505050565b600160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110e057600080fd5b600160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60606000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156111a957602002820191906000526020600020905b81546000191681526020019060010190808311611191575b5050505050905090565b600080600091505b82518210156113785782828151811015156111d257fe5b9060200190602002015161ffff1690506000600102600019166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110151561123657fe5b9060005260206000200154600019161415151561124f57fe5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020828154811015156112d857fe5b906000526020600020015490806001815401808255809150509060018203906000526020600020016000909192909190915090600019169055506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208181548110151561135d57fe5b906000526020600020016000905581806001019250506111bb565b8373ffffffffffffffffffffffffffffffffffffffff167f746c5afa194dd33ab23937c67f9e99800eb78b625176eb271c3dec182f57dbc1846040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156113f45780820151818401526020810190506113d9565b505050509050019250505060405180910390a250505050565b6000806000806000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561147157600080fd5b428b118061147f575060008b145b151561148a57600080fd5b61149660008c8c6117bd565b94506001858a8a8a604051600081526020016040526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000865af115801561150f573d6000803e3d6000fd5b505050602060405103519350600092505b89518310156116e857898381518110151561153757fe5b9060200190602002015191506000600102600019166000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208361ffff1681548110151561159b57fe5b906000526020600020015460001916141515156115b457fe5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208261ffff1681548110151561160357fe5b906000526020600020015490506000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150509060018203906000526020600020016000909192909190915090600019169055506000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208261ffff168154811015156116cd57fe5b90600052602060002001600090558280600101935050611520565b8573ffffffffffffffffffffffffffffffffffffffff167f4490f02c64b562efdc9d14a196182a17381fdb62142db3a2117519102a151ea98b8b8b8b60405180806020018560ff1660ff16815260200184600019166000191681526020018360001916600019168152602001828103825286818151815260200191508051906020019060200280838360005b8381101561178f578082015181840152602081019050611774565b505050509050019550505050505060405180910390a25050505050505050505050565b60008060ff16905090565b6000606060008060028551026054016040519080825280601f01601f1916602001820160405280156117fe5781602001602082028038833980820191505090505b5092506118096108d7565b9150600090505b60208110156118715780600802879060020a02600102838281518110151561183457fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050611810565b600090505b60208110156118da5780600802869060020a02600102836020830181518110151561189d57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050611876565b600090505b601481101561195e5780600802826c01000000000000000000000000026bffffffffffffffffffffffff19169060020a02838260400181518110151561192157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080806001019150506118df565b600090505b8451811015611a84576008858281518110151561197c57fe5b9060200190602002015161ffff169060020a90047f01000000000000000000000000000000000000000000000000000000000000000283600283026054018151811015156119c657fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508481815181101515611a0457fe5b906020019060200201517f0100000000000000000000000000000000000000000000000000000000000000028360016002840260540101815181101515611a4757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050611963565b826040518082805190602001908083835b602083101515611aba5780518252602082019150602081019050602083039250611a95565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020935050505093925050505600a165627a7a72305820eab8969e988928ec6e8fdf99762acd22f5b22919327e96d30d547e91c339629f0029',
                gas: '4700000'
            },
            function (e, contract)
            {
                console.log(e, contract);
                if(e)
                {
                    alert(e);
                    return;
                }
                if (typeof contract.address !== 'undefined')
                {
                    alert('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                    //set xcontract button
                    $("#viewOnXContract").show().click(() =>
                    {
                        let url = "https://xcontract.herokuapp.com/api/" + JSON.stringify(ticketpro.abi) + "/" + contract.address;
                        window.location.href(url);
                    });
                    $("#viewOnEtherscan").show().click(() => {
                        let network = web3.eth.net.getId();
                        let etherscanURL = getEtherScanURL(network);
                        window.location.href(etherscanURL + contract.address);
                    });
                }
            });
    }

    function getEtherScanURL(networkId)
    {
        if(networkId = 1) return "https://etherscan.io/address/";
        else if(networkId = 3) return "https://ropsten.etherscan.io/address/";
        else if(networkId = 4) return "https://rinkeby.etherscan.io/address/";
        else if(networkId = 42) return "https://kovan.etherscan.io/address/";
        return "https://etherscan.io/address/"
    }
});