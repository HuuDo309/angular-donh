import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { MappingService } from '../mapping.service';
import { Blog } from '../models/blogs';

@Component({
  selector: 'app-blog-create-edit',
  templateUrl: './blog-create-edit.component.html',
  styleUrls: ['./blog-create-edit.component.css']
})
export class BlogCreateEditComponent implements OnInit {
  blogForm!: FormGroup;
  isEditMode: boolean = false; 
  blogId: number | null = null;

  categories: { value: number, label: string }[] = [];
  positions: { value: number, label: string }[] = [];
  publicOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private mappingService: MappingService,
    private route: ActivatedRoute,
    private router: Router 
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      des: ['', Validators.required],
      detail: ['', Validators.required],
      category: ['', Validators.required],
      position: this.fb.array([], Validators.required),
      public: [null, Validators.required],
      data_pubblic: [null, Validators.required],
      thumbs: [null]
    });    
  }

  ngOnInit(): void {
    this.categories = this.mappingService.getCategories();
    this.positions = this.mappingService.getPositions();

    this.route.params.subscribe(params => {
      this.blogId = +params['id'];  
      if (this.blogId) {
        this.isEditMode = true;  
        this.loadBlogData(this.blogId);  
      }
    });
  }

  loadBlogData(id: number): void {
    this.blogService.getBlogFromId(id).subscribe(blog => {
      this.blogForm.patchValue({
        title: blog.title,
        des: blog.des,
        detail: blog.detail,
        category: blog.category,
        public: blog.public,
        data_pubblic: blog.data_pubblic,
      });

      const positionArray = this.blogForm.get('position') as FormArray;
      positionArray.clear();
      if (blog.position && Array.isArray(blog.position)) {
        blog.position.forEach((pos: number) => {
          positionArray.push(this.fb.control(pos)); 
        });
      }
      if (blog.public !== undefined) {
        this.setPublicStatus(blog.public);
      }
    });
  }

  setPublicStatus(isPublic: boolean): void {
    this.blogForm.get('public')?.setValue(isPublic);
  }

  isPublicSelected(value: boolean): boolean {
    const currentPublicValue = this.blogForm.get('public')?.value;
    return currentPublicValue === value;
  }
  
  onPositionChange(index: number, event: any): void {
    const positionArray = this.blogForm.get('position') as FormArray;
  
    if (event.target.checked) {
      positionArray.push(this.fb.control(this.positions[index].value));
    } else {
      const i = positionArray.controls.findIndex(
        ctrl => ctrl.value === this.positions[index].value
      );
      if (i !== -1) {
        positionArray.removeAt(i);
      }
    }
  }

  isPositionSelected(value: number): boolean {
    const positionArray = this.blogForm.get('position') as FormArray;
    return positionArray.value.includes(value); 
  }
  
  onSubmit(): void {
    if (this.blogForm.valid) {
      const formData = this.blogForm.value;
      if (this.isEditMode) {
        const blogId = this.blogId;  
        if (blogId) {
          formData.id = blogId;  
        }
        this.blogService.editBlog(formData).subscribe(response => {
          console.log('Blog updated:', response);
          this.router.navigate(['/blogs']);
        });
      } else {
        this.blogService.addBlog(formData).subscribe(response => {
          console.log('Blog created:', response);
          this.router.navigate(['/blogs']);
        });
      }
    } else {
      console.log('Form is not valid!');
    }
  }
  

  onClear(): void {
    this.blogForm.reset();
  }
}