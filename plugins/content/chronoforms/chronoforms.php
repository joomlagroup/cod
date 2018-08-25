<?php
defined('_JEXEC') or die('Restricted access');
if(!defined('DS')){
	define('DS', DIRECTORY_SEPARATOR);
}
require_once ( JPATH_BASE .DS.'includes'.DS.'defines.php' );
require_once ( JPATH_BASE .DS.'includes'.DS.'framework.php' );
$mainframe = JFactory::getApplication('site');
//$mainframe->initialise();
//load chronoforms classes
if(file_exists(JPATH_SITE.DS.'components'.DS.'com_chronoforms'.DS.'chronoforms.html.php') && file_exists(JPATH_SITE.DS.'components'.DS.'com_chronoforms'.DS.'libraries'.DS.'chronoform.php')){
	$mainframe->registerEvent('onContentPrepare', 'plgContentChronoforms');
	require_once(JPATH_SITE.DS.'components'.DS.'com_chronoforms'.DS.'chronoforms.html.php');
	require_once(JPATH_SITE.DS.'components'.DS.'com_chronoforms'.DS.'libraries'.DS.'chronoform.php');
}

if(!class_exists('JCFParameter')){
	class JCFParameter{
		var $params = null;
		
		function __construct($string = ''){
			if(is_array($string)){
				$this->params = $string;
			}else{
				$this->setParams($string);
			}
		}
		
		function get($k, $v = null){
			if(array_key_exists($k, $this->params)){
				return $this->params[$k];
			}else{
				return $v;
			}
		}
		
		function set($k, $v){
			$this->params[$k] = $v;
		}
		
		function setParams($string = ''){
			if(strlen(trim(($string))) > 0){
				$data = json_decode($string, true);
				$this->params = $data;
			}else{
				$this->params = array();
			}
		}
		
		function toString(){
			return json_encode($this->params);
		}
		
		function toArray(){
			return $this->params;
		}
		
		function toObject(){
			return json_decode(json_encode($this->params));
		}
	}
}

//function plgContentChronoforms(&$row, &$params, $page=0){	
function plgContentChronoforms($context, &$row, &$params, $page=0){
	$plugin = JPluginHelper::getPlugin('content', 'chronoforms');
	$pluginParams = new JCFParameter($plugin->params);
	// define the regular expression for the bot
	$regex = "#{chronoforms}(.*?){/chronoforms}#s";
	if(isset($row->text)){
		$row->text = preg_replace_callback($regex, '_processForm', $row->text);
	}else{
		$row->text = '';
	}
	//check after text forms
	$after_text = trim($pluginParams->get('after_text_forms'));
	if(!empty($after_text)){
		$details = explode("\n", $after_text);
		foreach($details as $detail){
			$form_details = explode("=", $detail);
			if(count($form_details) == 2 && !empty($form_details[1])){
				$cats = explode(',', $form_details[1]);
				foreach($cats as $cat){
					if(isset($row->catid) && $cat == $row->catid){
						$row->text = $row->text._displayForm($form_details[0]);
					}
				}				
			}
		}
	}
	
	return true;
}

function _processForm($matches){
	if(isset($matches[1]) && !empty($matches[1])){
		$formname = $matches[1];
		return _displayForm($formname);
	}
}

function _displayForm($formname){
	$form = CFChronoForm::getInstance($formname, true);
	if(empty($form->form_name)){
		return "There is no form with this name or may be the form is unpublished, Please check the form and the url and the form management.";
	}
	$loaded_form = JRequest::getVar('chronoform');
	if(!empty($loaded_form) && (trim($loaded_form) != $form->form_name)){
		$event = '';
	}else{
		$event = JRequest::getVar('event');
	}
	if(empty($event)){
		$event = 'load';
	}
	$form->process($event);
	ob_start();
	HTML_ChronoForms::processView($form);
	$output = ob_get_clean();
	return $output;
}
?>