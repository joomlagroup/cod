<?php
/**
* CHRONOFORMS version 4.0
* Copyright (c) 2006 - 2011 Chrono_Man, ChronoEngine.com. All rights reserved.
* Author: Chrono_Man (ChronoEngine.com)
* @license		GNU/GPL
* Visit http://www.ChronoEngine.com for regular updates and information.
**/
defined('_JEXEC') or die('Restricted access');
class ChronoFormsInputSubmit{
	function load($clear){
		if($clear){
			$element_params = array(
								'input_name' => 'input_submit_{n}',
								'input_id' => '',
								'input_class' => '',
								'multiline_start' => '0',
								'multiline_add' => '0',
								'button_type' => 'submit',
								'button_align' => 'left',
								'back_button' => 0,
								'reset_button' => 0,
								'container_id' => 0,
								'back_button_value' => 'Back',
								'reset_button_value' => 'Reset',
								'back_button_class' => '',
								'reset_button_class' => '',
								'input_value' => 'Submit');
		}
		return array('element_params' => $element_params);
	}
	
	function save($formdata_element = array(), $field_header = '', $formcontent_item_array = array()){
		$formcontent_item_array['name'] = $formdata_element[$field_header.'_input_name'];
		$formcontent_item_array['id'] = $formdata_element[$field_header.'_input_id'];
		$formcontent_item_array['class'] = $formdata_element[$field_header.'_input_class'];
		$formcontent_item_array['multiline_start'] = $formdata_element[$field_header.'_multiline_start'];
		$formcontent_item_array['multiline_add'] = $formdata_element[$field_header.'_multiline_add'];
		$formcontent_item_array['button_type'] = $formdata_element[$field_header.'_button_type'];
		$formcontent_item_array['button_align'] = $formdata_element[$field_header.'_button_align'];
		$formcontent_item_array['back_button'] = $formdata_element[$field_header.'_back_button'];
		$formcontent_item_array['reset_button'] = $formdata_element[$field_header.'_reset_button'];
		$formcontent_item_array['back_button_value'] = $formdata_element[$field_header.'_back_button_value'];
		$formcontent_item_array['reset_button_value'] = $formdata_element[$field_header.'_reset_button_value'];
		$formcontent_item_array['back_button_class'] = $formdata_element[$field_header.'_back_button_class'];
		$formcontent_item_array['reset_button_class'] = $formdata_element[$field_header.'_reset_button_class'];
		$formcontent_item_array['value'] = $formdata_element[$field_header.'_input_value'];
		$formcontent_item_array['type'] = $formdata_element['type'];
		return $formcontent_item_array;
	}
}
?>