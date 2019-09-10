var Sudoku = {
    
    matrix:[  [[7],[2],[],[9],[4],[5],[],[3],[]],
        [[],[3],[9],[2],[],[6],[],[],[4]],
        [[1],[5],[],[7],[3],[8],[6],[9],[2]],
        [[6],[4],[7],[1],[],[3],[],[2],[]],
        [[9],[8],[2],[6],[5],[7],[4],[1],[3]],
        [[3],[],[5],[4],[9],[2],[7],[],[6]],
        [[4],[9],[3],[],[6],[1],[],[5],[7]],
        [[5],[7],[],[3],[2],[],[8],[6],[9]],
        [[],[],[8],[5],[7],[9],[3],[4],[]]
    ],
    start: function(){
        for (var i = 0; i < 9; i++) {
            var row = $('<tr></tr>');
            for(var j = 0; j < 9; j++){
                var sBlock = $('<td class="sBox edit"></td>');
                sBlock.attr('id','Block'+'_'+ i + '_' + j).text(Sudoku.matrix[i][j]);  
                row.append(sBlock);
                if(Sudoku.matrix[i][j] != ''){  
                    sBlock.removeClass('edit');
                }
                var groups = Math.floor(Math.sqrt(9)); 
                var gA = Math.floor(i / groups);
                var gB = Math.floor(j / groups);
                if (gA % 2 == gB % 2) {
                    sBlock.addClass('sGroup');
                }else{
                    sBlock.addClass('sGroup2');
                }
            $('#sTable').append(row);
            }
        }
    },
    play : function(){
        $('.sBox').click(function(event){
            event.stopPropagation();
            if($(this).hasClass('edit') == true){
                $('.selectActive').removeClass('selectActive');
                $(this).addClass('selectActive');
                $('.select').css('top',event.pageY).css('left',event.pageX).addClass('active');
            }
        });
        $('.select div').click(function(){ 
            var thisInput = $(this).text();
            var location = $('.selectActive').attr('id').split('_');   
            var thisRow = parseInt(location[1]);    
            var thisCol = parseInt(location[2]);  
            Sudoku.matrix[thisRow][thisCol] = parseInt(thisInput); 
            $('.sWrong').removeClass('sWrong');
            Sudoku.compare();   

            $('.selectActive').text(parseInt(thisInput));
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        });

        $('html').click(function(){    
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        })

    },
    compare : function(){
        var matrix = Sudoku.matrix;
         for(var i=0; i<9; i++){
             for(var j=0; j<9; j++){
                 for(var h=0; h<9; h++){
                     if(
                         (matrix[i][j] == matrix[i][h] && j != h)   
                         || (matrix[i][j] == matrix[h][j] && i != h)    
                       ){
                         $('#Block_'+i+'_'+j).addClass('sWrong');
                     };
                 for(var k = 0; k < 3; k++) 
                     for(var l = 0; l < 3; l++)
                         if(
                            (matrix[i][j] == matrix[parseInt(i / 3) * 3 + k][parseInt(j / 3) * 3 + l])
                            && (!(i == parseInt(i / 3)*3+k && j == parseInt(j / 3)*3+l))
                            ){
                                 $('#Block_'+i+'_'+j).addClass('sWrong');
                             };
                 }
             }
         }
    }
};
$(document).ready(function(){
    Sudoku.start();
    Sudoku.play();
});