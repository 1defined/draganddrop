//Criar evento de click em NeutralArea (área que aceita todos quadrados)
 //saber onde o usuario clicou usando e.target (e recebido na função é o de evento). PROBLEMA: seleciona o item dentro clicado. Mas eu preciso selecionar o item que possui o evento, para corrigir isso usa-se currentTarget
   //target = elemento exato em que cliquei  currentTarget = elemento que possui o evento, independente do que tem dentro dele
    //saber onde o usuario clicou usando e.currentTarget
//definir os itens arrastáveis (no HTML definir uma propriedade draggable = true  p/ definir um clone visual)


//criar OBJETO que armazenará as informações das áreas dropáveis a, b, c. Caso haja algum item dentro da caixa, a variável vai armazenar. Ex: a: 2  (dentro da caixa a tem o item 2 ) 
//Sempre que um objeto é dropado, preciso ter uma função que lê o que foi feito na tela e armazene nestas variáveis abc
let areas = {
    a: null,
    b: null,
    c: null
};


document.querySelectorAll('.item').forEach(item => {


    //"item, quando eu começar a arrastar faça X, quando eu terminar de arrastar faça Y"
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

//definir eventos para as áreas em que eu posso jogar o item
document.querySelectorAll('.area').forEach(area => {
    //para criar uma área em que é possível soltar coisas dentro, deve-se criar no mínimo 3 eventos diferentes
    area.addEventListener('dragover', dragOver); //vai rodar sempre que passar por cima da área em que eu adicionei o evento (nas divs area por exemplo)
    area.addEventListener('dragleave', dragLeave);//Executa toda vez que o usuário sai com o item da área dropável
    area.addEventListener('drop', drop);//Executa toda vez que usuário soltar o item dentro de área dropável e esta área dropável n está bloqueada


});

//Adicionar os mesmos eventos da área dropável a neutralArea para que os itens possam retornar
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);




//////////////////////////////////Funções dos itens
function dragStart(e){

    //adicionar class ao item que está sendo arrastado (fica mais opaco demtro do neutralArea)
    e.currentTarget.classList.add('dragging');


}

function dragEnd(e){

    //remover class ao item que está sendo arrastado para parar o efeito
    e.currentTarget.classList.remove('dragging');

}


///////////////////////////Funções da Área dropável
function dragOver(e){


 //verificar se a região em que eu estou arrastando o item está disponível para o drop. Faço isso indo dentro dela e vendo se existe alguma div com a  class item dentro dela
    if(e.currentTarget.querySelector('.item') === null){

    //preciso liberar o drop do item. O padrão é bloquear o drag. Com o comando abaixo, eu retiro o padrão
    e.preventDefault();

    //mostrar visualmente o elemento que recebe o drop sendo selecionado usando o hover
    e.currentTarget.classList.add('hover');
}

//caso exista algum elemento dentro de uma área dropável, os efeitos não são aplicados e o item não é liberado para drop

    }




function dragLeave(e){

  //Ao sair do item dropável, remover o efeito visual
 e.currentTarget.classList.remove('hover');



}


function drop(e){

    //Quando soltar o item, remover o hover para n ficar "selecionada" a área visualmente
    e.currentTarget.classList.remove('hover');

  

    //verificar se a região em que eu estou arrastando o item está disponível para o drop. Faço isso indo dentro dela e vendo se existe alguma div com a  class item dentro dela
//selecionandon a regiao em questão
    if(e.currentTarget.querySelector('.item') === null){ //verifica se existe itens dentro da area
     
      //pegar o item que eu to arrastando
     //identificar o item que está sendo arrastado. A class draggins está identificando o item que está sendo arrastado, pois ela está usando evento para monitorar isso e adicionar a classe 
    let dragItem = document.querySelector('.item.dragging'); //pesquiso junto pois o classList.add não separa com espaço as classes
     
        //seleciona área  //appendChild = "vá até a area, veja os itens que existem e adicione isto no final". Como n tem nada, estou adicionando o item em si dentro dele
        e.currentTarget.appendChild(dragItem); //Ao invés de clonar o item, eu irei literalmente pegar ele da div itens e adicionar dentro da div area, fazendo-o sumir da parte de cima. Assim não precisarei RECRIAR os listeners de dragging para outro elemento clone, pois eles já estão criados para aquele elemento ali, tornando-o ainda arrastável
        
        updateAreas(); //Informa pro objeto as areas qual item está dentro da caixa
    }


}


///////////////////////////////Funções da Área Neutra (É necessário fazer com que o item possa ser dropado)


function dragOverNeutral(e){


     //preciso liberar o drop do item. O padrão é bloquear o drag. Com o comando abaixo, eu retiro o padrão
       e.preventDefault();
   
       //mostrar visualmente o elemento que recebe o drop sendo selecionado usando o hover
       e.currentTarget.classList.add('hover');
  
   
       }
   
   
   
   
   function dragLeaveNeutral(e){
   
     //Ao sair do item dropável, remover o efeito visual
    e.currentTarget.classList.remove('hover');
   
   }
   
   
   function dropNeutral(e){
   
       //Quando soltar o item, remover o hover para n ficar "selecionada" a área visualmente
      e.currentTarget.classList.remove('hover');
   
       //Não precioso verificar se a região em que eu estou arrastando o item está disponível para o drop pois a neutralArea aceita as 3
        
        //pegar o item que eu to arrastando
        //identificar o item que está sendo arrastado. A class draggins está identificando o item que está sendo arrastado, pois ela está usando evento para monitorar isso e adicionar a classe 
         let dragItem = document.querySelector('.item.dragging'); //pesquiso junto pois o classList.add não separa com espaço as classes
        
           //seleciona área  //appendChild = "vá até a area, veja os itens que existem e adicione isto no final"
         e.currentTarget.appendChild(dragItem); //Ao invés de clonar o item, eu irei literalmente pegar ele da div itens e adicionar dentro da div area, fazendo-o sumir da parte de cima. Assim não precisarei RECRIAR os listeners de dragging para outro elemento clone, pois eles já estão criados para aquele elemento ali, tornando-o ainda arrastável
  
         updateAreas(); //Informa pro objeto as areas qual item está dentro da caixa

   }
   


   /////////////funções lógicas do processo

   function updateAreas(){

    //ir em cada uma das áreas, ver se tem algum item dentro e, se existir, saber qual item é
    document.querySelectorAll('.area').forEach(area => {

        //buscar nome da área p/ preencehr variável
        let name = area.getAttribute('data-name');

        //verificar se tem item dentro da área
        if (area.querySelector('.item') !== null){
           
           //selecionando conteúdo do item (html) para armazenar na variável
            areas[name] = area.querySelector('.item').innerHTML; 

        }else {
            //caso não exista itens dentro da area
            areas[name] = null;

        }

    });
        
    //Verifica se está na ordem 1,2,3 se sim, pinta a div (area) maior de áreas dropáveis de verde 
        if (areas.a === '1' && areas.b === '2' && areas.c === '3' ){

            document.querySelector('.areas').classList.add('correct');

        }else {
            document.querySelector('.areas').classList.remove('correct');

        }


   }