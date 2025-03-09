<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html manifest="">
    <head>
        <meta charset="UTF-8">
        <title>Home</title>
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/ext-6.5.3/packages/theme-gray/resources/theme-gray-all.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/ext-6.5.3/packages/charts/classic/classic/resources/charts-all.css" />">

        <link href="<c:url value="/resources/css/inicio.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/extjs.css" />" rel="stylesheet" />

        <link href="<c:url value="/resources/css/Master.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/iconos.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/js/SimpleViewer/css/jquery.verySimpleImageViewer.css" />" rel="stylesheet" />

        <link href="<c:url value="/resources/js/praxis.ui-1.0/css/praxis.ui-1.0.css" />" rel="stylesheet" />
        <!--[if IE 8]> <link href="<c:url value="/resources/js/praxis.ui-1.0/css/praxis.ui-1.0-ie8.css" />" rel="stylesheet" type="text/css"> <![endif]-->
        <link href="<c:url value="/resources/css/fontawesome/css/all.min.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/mt-calendar.css" />" rel="stylesheet" />

    <!--link href="<c:url value="/resources/fonts/css/font-awesome.css" />" rel="stylesheet" /-->
        <link href="<c:url value="/resources/css/mt-calendar.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/img/sprites/images.sprite.css" />" rel="stylesheet" />
        <link rel="Shortcut Icon" href="<c:url value="/resources/img/login/favicon_2.png" />"  />
        <link href="<c:url value="/resources/js/AwesomeNotifications/AwesomeNotifications.css"/>" rel="stylesheet" />
        <script type="text/javascript">
            var Ext = Ext || {};
            var CONTEXTPATH = '<%=request.getContextPath()%>';
            var gloServerDate = '${vp_serverDate}';
            var gloServerTime = '${vp_serverTime}';
            var gloUsr = '', isDashboard = false, extLoaded = false;
            var lg = function(s){ console.log(s); };
            var clr = function(){ console.clear(); };
            var me;
            Ext.beforeLoad = function(tags){
            Ext.manifest = 'classic';
            }

        </script>

        <script type="text/javascript" src="<c:url value="/resources/js/ext-6.5.3/ext-all.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/ext-6.5.3/packages/charts/classic/charts.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/ext-6.5.3/packages/locale/locale-en.js" />"></script>
        <!? [if lt IE 11]>
        <script type="text/javascript" src="<c:url value="/resources/js/praxis.ui-1.0/praxis.utils-1.0.js" />" />"></script>
    <![endif]?>
    <!--<script src="<c:url value="/resources/js/jquery.min.1.11.2.js" />"></script>/-->
    <script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script src="https://cdn.rawgit.com/digitalBush/jquery.maskedinput/1.4.1/dist/jquery.maskedinput.min.js"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/DayPilot/daypilot-all.min.js" />"></script>
    <link href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="<c:url value="/resources/js/MonthPicker/MonthPicker.min.css"/>" rel="stylesheet" type="text/css">
    <script src="<c:url value="/resources/js/MonthPicker/MonthPicker.min.js"/>"></script>
    <script src="<c:url value="/resources/js/SimpleViewer/js/jquery.verySimpleImageViewer.min.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/global.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/AwesomeNotifications/AwesomeNotifications.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/Axios/axios.min.js"/>"></script>
    <script lang="javascript" src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
    <script type="text/javascript">       

            Ext.Loader.setConfig({
            enabled: true,
                    paths: {
                    'Ext.Praxis': CONTEXTPATH + '/apps/praxis/app',
                            'Ext.ux': CONTEXTPATH + '/resources/js/ext-6.5.3/ux',
                            'Ext.global': CONTEXTPATH + '/resources/js/global',
                            'Ext.ux.window': CONTEXTPATH + '/resources/js/global'
                    }
            });
            Ext.require([
                    '*',
                    'Ext.global.ControlData',
                    'Ext.global.Paginator',
                    'Ext.global.MtCalendar',
                    'Ext.ux.window.Notification',
                    'Ext.global.BrowserTicket'
            ]);
            Ext.tip.QuickTipManager.init();
            Ext.Ajax.timeout = 18000000;
            /*document.onclick= function(event) {
             if (event===undefined) event= window.event;
             var target= 'target' in event? event.target : event.srcElement;
             console.log('ONCLICK');  
             console.log(userAccess);
             console.log(userAccess.length);
             console.log(optionSelect);
             console.log(accessSelect);
             if(userAccess.length>0)
             {
             var plusItems = document.querySelectorAll('.prx-icon-add');
             var createItems = document.querySelectorAll('-btn-save');
             var updateItems = document.querySelectorAll('.prx-icon-update');
             //var updateItems = document.querySelector('span').closest(".prx-icon-update");
             console.log("updateItems");
             console.log(updateItems);
             var deleteItems = document.querySelectorAll('-btn-delete');
             var exportItems = document.querySelectorAll('.prx-icon-excel');
             // PERML, PERMC, PERMM, PERME, PERMX
             if(accessSelect.PERMC==='N'){
             plusItems.forEach(function(plusItem) {
             document.getElementById(plusItem.id).style.display = 'none'; // HIDE
             });
             createItems.forEach(function(createItem) {
             document.getElementById(createItem.id).style.display = 'none'; // HIDE
             });
             }else{
             plusItems.forEach(function(plusItem) {
             document.getElementById(plusItem.id).style.display = 'block'; // SHOW
             });
             createItems.forEach(function(createItem) {
             document.getElementById(createItem.id).style.display = 'block'; // SHOW
             });
             }
             if(accessSelect.PERMM==='N'){
             updateItems.forEach(function(updateItem) {
             console.log("updateItem N");
             return;
             //console.log(document.getElementById(updateItem.id).parentNode);
             //document.getElementById(updateItem.id).style.display = 'none'; // HIDE
             });
             }else{
             updateItems.forEach(function(updateItem) {
             console.log("updateItems Y");
             //console.log(document.getElementById(updateItem.id).parentNode);
             //document.getElementById(updateItem.id).style.display = 'block'; // SHOW
             });
             }
             if(accessSelect.PERME==='N'){
             deleteItems.forEach(function(deleteItem) {
             document.getElementById(deleteItem.id).style.display = 'none'; // HIDE
             });
             }else{
             deleteItems.forEach(function(deleteItem) {
             document.getElementById(deleteItem.id).style.display = 'block'; // SHOW
             });
             }
             if(accessSelect.PERMX==='N'){
             exportItems.forEach(function(exportItem) {
             document.getElementById(exportItem.id).parentNode.parentNode.style.display = 'none';
             //document.getElementById(exportItem.id).style.display = 'none'; // HIDE
             });
             }else{
             exportItems.forEach(function(exportItem) {
             document.getElementById(exportItem.id).parentNode.parentNode.style.display = 'block';
             });
             }
             }
             };*/
    </script>

    <script type="text/javascript" src="<c:url value="/resources/js/rainbow/rainbow-custom.min.js" />"></script>
    <script type="text/javascript" src="<c:url value="/apps/praxis/app.js" />"></script>
</head>
<body>

</body>
</html>