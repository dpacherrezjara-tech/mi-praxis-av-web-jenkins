var lg = function(s){ console.log(s); };
var clr = function(){ console.clear(); };

var PraxisUI = PraxisUI || { };

PraxisUI = jQuery.extend(PraxisUI, {
    jqID: function(id){
        return $('#' + id);
    },
            
    jqClass: function(_class){
        return $('.' + _class);
    },
            
    setSelectedValue : function(id, value){
        var select = PraxisUI.jqID(id)[0];
        if(!select) return;
        
        var opcSel = $('option[value="' + value + '"]', select);
        opcSel.attr('selected', 'selected');
    },
            
    setSelectedText : function(id, text){
        var binded = false;
        var select = PraxisUI.jqID(id);
        
        if(!select) return;
        
        var options = $('option', select);
        
        $.each(options, function(a,b){
           var html= $(b).html();
           
           if(text === html){
               $(b).attr('selected', 'selected');
               binded = true;
               return;
           }
        });
        
        return binded;
    },
    
    setCommandAction : function(key, func){
        return this.jqClass(key).on('click', func);
    },
            
    execute : function(url, params, success){
        $.ajax({
            url : url,
            type : 'POST',
            data : params,
            dataType : 'json',
            beforeSend : function(){ PraxisUI.ProgressBar.show(); },
            success : success,
            error : function(error){
                lg(error);
                PraxisUI.Alert.show(PraxisUI.Alert.messages.ERROR, 'Result', PraxisUI.Alert.buttonTypes.ok);
            },
            complete : function(){
                PraxisUI.ProgressBar.hide(); 
            }
        });
    },
        
    Alert : {
        alertButtonTemplate : '<button class="btn-data-entry btn-alert @type">@text</button>',
        buttonTypes : {
            OK : 0,
            ACCEPT_CANCEL : 1,
            YES_NO : 2
        },
        resultTypes : {
            OK : 0,
            CANCEL : 1
        },		
        messages : {
            OK : 'Operation was completed successfully',
            ERROR : 'An error ocurred when trying to process the request',
            NO_DATA : 'Not data found',
            CONFIRM : 'Are you sure to continue?',    
            CONFIRM_INSERT : 'Are you sure to save the record?',
            CONFIRM_UPDATE : 'Are you sure to update the record?',
            CONFIRM_DELETE : 'Are you sure to delete the record?',
            INSERTED : 'Record was inserted successfully',
            UPDATED : 'Record was updated successfully',
            DELETED : 'Record was deleted successfully',
            VALIDATE : 'Please enter required fields'
        },
        centerAlert : function(s){
            var selector = s || 'alert-message';
            c = $('.' + selector);

            var w = window.innerWidth, h = window.innerHeight;
            var alertW = parseInt(c.css('width').replace('px', ''));
            var alertH = parseInt(c.css('height').replace('px', ''));

            var middleW = parseInt(w / 2);
            var middleH = parseInt(h / 2);
            var middleWA = parseInt(alertW / 2);
            var middleHA = parseInt(alertH / 2);

            var left = middleW - middleWA;
            var top = middleH - middleHA - 40;

            c.css('left', left);
            c.css('top', top);
        },
        show : function(message, title, buttonType, func){
            var result = null;
            var controlAlert = $('.alert-message');

            $('.alert-title').html(title);
            $('.alert-body').html(message);

            var btns = '';

            switch(buttonType){
                case PraxisUI.Alert.buttonTypes.OK: {
                    btns = PraxisUI.Alert.alertButtonTemplate.replace('@type', 'btn-ok').replace('@text', 'OK');
                } break;
                case PraxisUI.Alert.buttonTypes.ACCEPT_CANCEL:{
                    var btnAccept = PraxisUI.Alert.alertButtonTemplate.replace('@type', 'btn-ok').replace('@text', 'Accept');
                    var btnCancel = PraxisUI.Alert.alertButtonTemplate.replace('@type', 'btn-close').replace('@text', 'Cancel');
                    btns = btnAccept + btnCancel;
                }; break;
                case PraxisUI.Alert.buttonTypes.YES_NO: {
                    var btnYes = PraxisUI.Alert.alertButtonTemplate.replace('@type', 'btn-ok').replace('@text', 'Yes');
                    var btnNo = PraxisUI.Alert.alertButtonTemplate.replace('@type', 'btn-close').replace('@text', 'No');
                    btns = btnYes + btnNo;
                } break;
                
                default : btns = PraxisUI.Alert.alertButtonTemplate.replace('@type', 'btn-ok').replace('@text', 'OK');
            };
            
            $('.alert-buttons').html(btns);

            PraxisUI.Alert.centerAlert();
            $('.alert').show();
            controlAlert.show();

            $('.btn-ok').on('click', function(){
                result = PraxisUI.Alert.resultTypes.OK;
                PraxisUI.Alert.hide();
                if(func) func(result);
            });

            $('.btn-close').on('click', function(){
                result = PraxisUI.Alert.resultTypes.CANCEL;
                PraxisUI.Alert.hide();
                if(func) func(result);
            });
        },
        hide : function(){
            $('.alert').hide();
            $('.alert-message').hide();
        }
    },
            
    CommandBar : {
        commandKeys : {
            doSearch : 'search',
            toggleFilters : 'filter',
            exportToExcel : 'excel',
            clearFilters : 'clear',
            addNew : 'add',
            goToBack : 'back',
            query : 'query',
            exportToText : 'text',
            addFavorite : 'favorite'
        },

        commandOptions : {
            keys : [ 'search', 'filter', 'excel', 'clear', 'add', 'back', 'query', 'text', 'favorite' ],
            pagination : {
                enabled : true,
                keys : [ 'first', 'prev', 'next', 'last' ]
            }
        },

        createCommandsBar: function(id, opts){
            var commandTemplate = '<button class="@action">';
            var commandOptions = PraxisUI.CommandBar.commandOptions;

            if(opts){
                commandOptions.keys = opts.keys || commandOptions.keys;
                commandOptions.pagination = opts.pagination || commandOptions.pagination;
            };

            var container = PraxisUI.jqID(id);
            var commandTools = document.createElement('DIV');
            commandTools.className = 'page-buttons-control';

            $.each(commandOptions.keys, function(x, y){
                var button = commandTemplate.replace('@action', y);
                commandTools.innerHTML += button;
            });

            container.append(commandTools);

            if(commandOptions.pagination.enabled){
                $('.paginator').show();
                var commandPager = document.createElement('DIV');
                commandPager.className = 'page-buttons-page';

                $.each(commandOptions.pagination.keys, function(a, b){
                    var pageBn = commandTemplate.replace('@action', b + ' btn-pag');
                    commandPager.innerHTML += pageBn;
                });

                container.append(commandPager);
            };

            var commandBar = document.createElement('DIV');
            commandBar.innerHTML = '<div class="page-progressbar"></div>';
            container.append(commandBar);

            PraxisUI.setCommandAction('first', function(e){ 
                alert('first');
            });

            PraxisUI.setCommandAction('prev', function(e){ 
                alert('prev');
            });

            PraxisUI.setCommandAction('next', function(e){ 
                alert('next');
            });

            PraxisUI.setCommandAction('last', function(e){ 
                alert('last');
            });

            PraxisUI.setCommandAction('filter', function(e){ 
                var form = $('#formFilter');
                var visible = form.css('display') || 'inherit';

                if(visible === 'none'){
                    form.show();
                }else{
                    form.hide();
                };
            });

            PraxisUI.setCommandAction('back', function(e){ 
                $('#menu').show();
                $('.page-left-bar').show();
                $('#view-frame').hide();
                $('#view-frame').html('');
            });
        }
    },            
            
    DataEntry : {
        actions :{
            ADD : 0,
            MODIFY : 1
        },
        crudOptions :{
            VIEW : 'V',
            INSERT : 'I',
            UPDATE : 'U',
            DELETE : 'D'
        },
        entryTypes : {
            LOCAL : 0,
            PROXY : 1
        },
        load : function(id, options){
            var container = $('#' + id);
            
            var width = options.width || 800;
            var height = options.height || 'initial';
            
            container.css('width', width + 'px');
            container.css('heigth', height === 'initial' ? height : height + 'px');
            $('.btn-data-entry', container).hide();
            
            if(options.action === PraxisUI.DataEntry.actions.ADD){                
                $('.save', container).show();
                $('input', container).val('');
                $('select option:first-child', container).attr('selected', 'selected');   
            }
            else{
                $('.update', container).show();
                $('.delete', container).show();
                
                var entryType = options.type, model = options.model || null;

                switch(entryType){
                    case PraxisUI.DataEntry.entryTypes.LOCAL : {
                       if(model === null) return;

                       var inputs = $('[data-field]', container);

                        $.each(inputs ,function(a,b){
                            var field = $(b).data('field').toLowerCase().trim();
                            var value = $(model).data(field) || '';

                            var input = $(b);

                            if($('option', input).length > 0){
                                var binded = PraxisUI.setSelectedText(input[0].id, value);

                                if(!binded){
                                    PraxisUI.setSelectedValue(input[0].id, value);
                                };
                            }else{
                                input.val(value);
                            };
                        });
                    } break;

                    case PraxisUI.DataEntry.entryTypes.PROXY : {
                        //ajax
                    } break;

                    default : return;
                };

            };
            
            $('.cancel', container).show();
            $('.cancel', container).on('click', function(){ 
                PraxisUI.DataEntry.hide(id);
            });
            
            PraxisUI.Alert.centerAlert('modal-dialog');
            $('.modal-blind').fadeIn();
            $(container).fadeIn();
            
            window.onresize = function() {
                if ($('.modal-dialog').css('display') === 'none') return;
                PraxisUI.Alert.centerAlert('modal-dialog');
            };
        },
                
        hide : function(id){
            $(PraxisUI.jqID(id)).fadeOut();
            $('.modal-blind').fadeOut();
        },
                
        validate : function(id){
            var inputs = $('#' + id + ' :input[required]');
            var i, n = inputs.length;
            
            for(i=0;i<n;i++){
                var b = inputs[i];
                var value = $(b).val();
                
                if(value === '') {
                    PraxisUI.Alert.show(PraxisUI.Alert.messages.VALIDATE, "", PraxisUI.Alert.buttonTypes.OK);
                    //$(b).focus();
                    return false;
                };
            };
            
            return true;
        }
    },

    DataGrid : {
        configGridBrowser : function(){
            var rowCss = 'row';
            var alterCss = 'alter-row';
            var grids = $('.grid-browser');

            $.each(grids, function(x,y){
                var tbody = document.createElement('TBODY');
                var thead = $('THEAD', y)[0];

                var headers = PraxisUI.DataGrid.getHeaders(thead.rows[0].cells, true);
                
                $.each(headers, function(f,c){
                    var width = $(c).data('width') || '';
                    width = width === '' ? 'auto' : width + 'px';
                    c.style.width = width;
                    
                    var headertext = $(c).data('headertext') || '';
                    c.innerText = headertext;
                    
                    var resizeColumn = $(c).data('resize') || false;
                    
                    if(resizeColumn === true){
                        c.innerHTML += '<div class="resizeColumn"></div>';
                    };
                });

                var rows = parseInt($(y).data('rows') || 20);

                for (var i=1; i<=rows; i++) {
                    var row = '<tr class="' + (i % 2 === 0 ? rowCss : alterCss) + '">';

                    $.each(headers, function(a, b){
                        var align = $(b).data('align') || 'left';
                        var display = $(b).data('visible') || '';
                        display = display === 'hidden' ? 'none' : 'initial';
                        row += '<td style="text-align:' + align + ';display:' + display +'"></td>';
                    });

                    row += '</tr>';
                    tbody.innerHTML += row;
                };

                y.appendChild(tbody);
            });
        },
        clearGrid : function(tb){
            var c = $('tbody td', tb);
            $.each(c, function(f,g){
               c.html('');
            });
        },
        getHeaders : function(cells, includeHidden){
            var arr = [];
            includeHidden = includeHidden || false;
            
            $.each(cells, function(a,b){
                var isVisible = $(b).data('visible')  || 'visible';
            
                if(isVisible === 'visible' || includeHidden){
                    arr.push(b);
                };
                
                if(isVisible === 'hidden') b.style.display = 'none';
            });
            
            return arr;
        },
        bindGrid : function(id, datasource){
            var tb = $('#' + id);
            var tbody = $('tbody', tb);
            var thead = $('thead', tb);

            if(tbody.length === 0 || thead.length === 0) return;

            PraxisUI.DataGrid.clearGrid(tb);

            var oTable = tbody[0];
            var oTHead = thead[0];
            var columns = PraxisUI.DataGrid.getHeaders(oTHead.rows[0].cells, true);
            
            var m = columns.length;

            var filas = oTable.rows;

            var i, n= datasource.length;

            for(i=0; i<n; i++){
                var fila = filas[i];

                var j;
                var obj = datasource[i];

                for (j = 0; j<m; j++ ){        
                    var datafield = $(columns[j]).data('field');
                    var align = $(columns[j]).data('align') || '';
                    var dataRole = $(columns[j]).data('role') || '';
                    
                    if(datafield) {
                        fila.cells[j].innerText = obj[datafield] || '';
                        fila.cells[j].setAttribute('data-' + datafield, fila.cells[j].innerText);
                    }
                    
                    if(dataRole !== '') {
                        switch(dataRole){
                            case 'edit':{
                                var a = document.createElement('a');
                                a.href  = '#';
                                a.className = "center edit";

                                $.each(oTHead.rows[0].cells, function(g,h){
                                    var datafield = $(h).data('field');
                                    if(datafield) a.setAttribute('data-' + datafield, obj[datafield]);
                                });
                                
                                $(fila.cells[j]).append(a);
                            } break;
                            case 'link':{
                                var link = '<a href="#" class="grid-link ' + align + '">' + fila.cells[j].innerText + '</a>';
                                fila.cells[j].innerHTML = link;
                            } break;
                        };
                    };
                };
            };
        }
    },      
    
    Export : {
        exportXLS : function(table, rowCount, filename, includeHidden) {
            if(rowCount === 0){
                PraxisUI.Alert.show(PraxisUI.Alert.messages.NO_DATA, "", PraxisUI.Alert.buttonTypes.OK);
                return;
            };
            
            PraxisUI.ProgressBar.show(); 
            
            includeHidden = includeHidden || false;
            filename = filename + '.xls';
            var content = '';
            table = table[0];
            
            var theadRow = $('thead', table)[0].rows[0];
            var tbodyRows = $('tbody', table)[0].rows;
            
            var columns = PraxisUI.DataGrid.getHeaders(theadRow.cells, includeHidden);
            
            var th = '';
            
            $.each(columns, function(x,y) {
                th += '<th style=background-color: #084B8A; color: #fff">' + y.innerHTML + '</th>'; 
            });
            
            content += '<thead><tr>' + th + '</tr></thead>';
            
            content += '<tbody>';
            
            $.each(tbodyRows, function(a,b) {
                var row = '';
                row += '<tr>';
                
                $.each(columns, function(x,y) {
                    var field = $(y).data('field');
                    var text = '';
                    
                    if(field){
                        var cell = $('td[data-' + field.toLowerCase() + ']', b);
                        
                        if(cell.length > 0) text = cell[0].innerText;
                    };
                    
                    row += '<td>' + text + '</td>';
                });
                
                row += '</tr>';
                
                content += row;
            });
            
            content += '</tbody>';
            
            
            var container = document.createElement('DIV');
            container.id = 'dvDataExcel'; 
            container.innerHTML = '<table>' + content + '</table>';
            
            var uri = 'data:application/vnd.ms-excel,' + encodeURIComponent(container.innerHTML);
            
            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                document.body.appendChild(link); // Firefox requires the link to be in the body
                link.download = filename;
                link.href = uri;
                link.click();
                document.body.removeChild(link); // remove the link when done
            } else {
                location.replace(uri);
            }
            
            $(container).remove();
            
            PraxisUI.ProgressBar.hide(); 
        }
    }
});