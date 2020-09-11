import React, { useState, useEffect } from 'react';
import { categoryService } from "../../../services/categoryService";
import Icon from "../../../../src/common/Icon"
import Dropzone from "../../../../src/common/Dropzone"

import Return from "../../../common/Return"
import Button from "../../../common/GenericElement/GenericElement"

import AddCategoryModal from "./AddCategoryModal";

export const Categories = () => {
    const [categories, setCategories] = useState();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        categoryService
            .getAllCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch(() => {
            });
    }, [setOpenModal, openModal]);

    const openAddCategoryModal = () =>{
        setOpenModal(!openModal)
    }

    const noCategories = "No Categories"
    const categoriesTitle = "Categories"
    const addExerciseToCategory = "To be able to add exercises you need to add a category first"


    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>{categoriesTitle}</h2>
                <div onClick = {openAddCategoryModal}>
                <Icon name={"plus"} fill={"#5E4AE3"} /></div>
            </div>
            <AddCategoryModal openModal = {openModal} onClose={() => setOpenModal(false)}/>
            <div>
            {categories ? categories.map((category, i) => <Button key = {i} headline={category.title} category ={category}/>)
                    : noCategories + addExerciseToCategory}
            </div>
        </div>
    );
}


export default Categories;