/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Ext.Praxis.controller.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplinkController
 */
Ext.define('Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DisputeFileViewerMyarcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DisputeFileViewerMyarcController',

    beanTMP: {},
    urlWin01: CONTEXTPATH + '/DisputemanagementMyarcForm',
    urlWin02: '',

    IN_DATE: '',
    IN_ANIO: '',
    IN_PREME: '',
    IN_DOCUMENT: '',

    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.getFilesDirectory();
    },

    OnBeforeShow: function () {
        // prototype.id = 'BsplinkFileViewer';
        // prototype.url = CONTEXTPATH + '/BsplinkRefundQueryRFND';
    },

    getFilesDirectory: function () {
        var me = this;
        rec = me.view.params.rec;
        //data,nmemo


        me.IN_DATE = rec.data.A4138FREGI;
        me.IN_ANIO = me.view.params.anio;
        me.IN_PREME = me.view.params.preme;
        me.IN_DOCUMENT = me.view.params.nmemo;
                
        me.beanTMP.IN_OPTION = 1;
        me.beanTMP.IN_PATH = "";
        // me.beanTMP.IN_PATH = "D:\\PRAXIS_AM_HTML\\PXMVCAM\\web\\resources\\IMGTMPDISPUTE\\";
        me.beanTMP.IN_DATE = me.IN_DATE;
        me.beanTMP.IN_ANIO = me.IN_ANIO;
        me.beanTMP.IN_PREME = me.IN_PREME;

        var panel = Ext.getCmp(prototype.idDisputeFileViewerMyarc + '-panel-tree');
        panel.removeAll();

        // Ext.getCmp('DisputeFileViewer').mask('Please Wait....');
        Ext.Ajax.request({
            url:  me.urlWin01+ '/GetFilesDirectory', //prototype.idDisputeFileViewerMyarc + '/GetFilesDirectory',
            method: 'POST',
            timeout: '300000',
            params: me.beanTMP,
            success: function (response, options) {
                //   Ext.getCmp('DisputeFileViewer').unmask();
                var res = Ext.JSON.decode(response.responseText);
                var data = Ext.JSON.decode(res.data);
                //console.log(data);

                var dataRoot = {text: me.beanTMP.IN_DOCUMENT, filename: '', expanded: true, flag: false, children: []};

                Ext.Object.each(data, function (index, value) {
                    dataRoot.children.push({
                        leaf: true,
                        text: value.filename,
                        filename: value.filename,
                        flag: true
                    });
                });

                var tree = Ext.create('Ext.tree.Panel', {
                    id: prototype.idDisputeFileViewerMyarc + '-tree-directory',
                    rootVisible: true,
                    root: dataRoot,
                    border: false,
                    useArrows: true,
                    multiSelect: true,
                    scope: this,
                    columns: [
                        {
                            xtype: 'treecolumn',
                            text: '',
                            dataIndex: 'text',
                            flex: 1
                        },
                        {
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 50,
                            align: 'center',
                            items: [
                                {
                                    iconCls: 'fas fa-file-download',
                                    tooltip: 'Download',
                                    handler: 'OnDownloadFile',
                                    isActionDisabled: 'OnDownloadActionDisabled'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        cellclick: 'OnTreeItemClick'
                    },
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: true,
                        getRowClass: function (record, rowIndex, rowParams, store) {
                            if (rowIndex % 2 == 0)
                                return 'rowA';
                        }
                    }
                });
                panel.add(tree);
                panel.updateLayout();
            }
        });
    },

    OnTreeItemClick: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (cellIndex == 0) {

            if (record.get('filename') !== '') {
                var extensionFile = Ext.util.Format.lowercase(record.get('filename').split('.').pop());
                var panel = Ext.getCmp(prototype.idDisputeFileViewerMyarc + '-panel-viewer');
                panel.removeAll();
                if (extensionFile === 'jpg' || extensionFile === 'png' || extensionFile === 'jpge') {
                    panel.update('<div id="' + prototype.idDisputeFileViewerMyarc + '-imageViewerContainer" style="width: 768px; height: 575px;" ></div>');

                    // /resources
                    var curect_file_path = CONTEXTPATH + "/IMGTMPDISPUTE/" + this.IN_ANIO + "/" + this.IN_PREME + "/" + this.IN_DATE + "/" + record.get('filename');
                    //console.log(curect_file_path);
                    $("#" + prototype.idDisputeFileViewerMyarc + "-imageViewerContainer").verySimpleImageViewer({
                        imageSource: curect_file_path,
                        frame: ['100%', '100%'],
                        maxZoom: '900%',
                        zoomFactor: '10%',
                        mouse: true,
                        keyboard: true,
                        toolbar: true,
                        rotateToolbar: true
                    });
                } else if (extensionFile === 'pdf') {
                    // /resources
                    var curect_file_path = CONTEXTPATH + "/IMGTMPDISPUTE/" + this.IN_ANIO + "/" + this.IN_PREME + "/" + this.IN_DATE + "/" + record.get('filename');
                    //console.log(curect_file_path);
                    var htmlPdf = '<object data="' + curect_file_path + '" style="width: 768px; height: 575px;" type="application/pdf">' +
                            '<embed src="' + curect_file_path + '"  style="width: 768px; height: 575px;" type="application/pdf" />' +
                            '</object>';
                    panel.update(htmlPdf);
                } else {
                    panel.update('<div id="' + prototype.id + '-imageViewerContainer" style="width: 768px; height: 575px; display: flex; justify-content:center; align-items: center;" ><span style="font-size: 24px;">Preview not available.</span></div>');
                }
            }
        }
    },

    OnDownloadFile: function (grid, rowIndex, colIndex) {
        //console.log(rowIndex);
        var record = grid.getStore().getAt(rowIndex);
        // /resources
        window.open(CONTEXTPATH + "/IMGTMPDISPUTE/" + this.IN_ANIO + "/" + this.IN_PREME + "/" + this.IN_DATE + "/" + record.get('filename'), '_blank');
    },

    OnDownloadActionDisabled: function (view, rowIndex, colIndex, item, record) {
        return !record.get('flag') ? true : false;
    },
    onCloseClick: function (btn) {
        this.view.close();
    },
});